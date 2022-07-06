import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
   @Output()urlEmitter: EventEmitter<string> = new EventEmitter()

  private basePath = '/uploads';
  constructor(private db: AngularFirestore,private storage: AngularFireStorage) { }
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.urlEmitter.emit(fileUpload.url);
          console.log('The download url',downloadURL);

          //this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
  private saveFileData(fileUpload: FileUpload): void {
    console.log('uploading file', fileUpload);

    let safeName = fileUpload.name.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
    let timestamp = Date.now();                                     // ex: '1598066351161'
    const uniqueSafeName = timestamp + '_' + safeName;
    const path = 'uploads/' + uniqueSafeName;                       // Firebase storage path
    const ref = this.storage.ref(path);                             // reference to storage bucket
            this.db.collection('files').doc(uniqueSafeName).set({
                storagePath: path,
                downloadURL: fileUpload.url,
                originalName: fileUpload.name,
                timestamp: timestamp
            })
                .then(function () {
                    console.log('document written!');
                })
                .catch(function (error) {
                    console.error('Error writing document:', error);
                });


  }
  getFiles(numberItems: number) {
    return this.db.collection(this.basePath, ref =>
      ref.limitToLast(numberItems));
     // return this.db.collection(this.basePath).snapshotChanges();
  }
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.collection(this.basePath).doc(key).delete();
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }


  // Uploader
  private uploadedUrls: string[] = [];
  public addUploadedUrl(url: string) {
    this.uploadedUrls.push(url);
    console.log(this.uploadedUrls);
  }
  public getUrls(): string[] {
    return this.uploadedUrls;
  }
  public clearUrls() {
    this.uploadedUrls = [];
  }
}