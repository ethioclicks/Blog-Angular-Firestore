import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0
  selectedFile: File = null
  uploadImageUrl: string;
  
  private basePath = '/uploads';
  @Output()onSingleImageUploaded: EventEmitter<string> = new EventEmitter()

  constructor(private storage: AngularFireStorage) { }
  ngOnInit(): void {
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);

          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.onSingleImageUploaded.emit(fileUpload.url);
          console.log('The download url',downloadURL);

          //this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
  // upload():void {
  //   const currenttime = new Date().getTime()
  //   const directory = 'testapp/'
  //   const imageFileName = currenttime + '_' + 'new'
  //   const filePath = directory + imageFileName
  //   const fileRef = this.afStorage.ref(filePath);
  //   const task = this.afStorage.upload(filePath, this.selectedFile);
  //   // this.uploadProgress = task.percentageChanges();
  //   // this.downloadURL = fileRef.getDownloadURL()

  //   task.percentageChanges().subscribe(percent => this.percentage=Math.trunc(percent))
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           if (url) {
  //             console.log("it is a url",url);
  //             this.uploadImageUrl=url;
  //             this.urlEmitter.emit(this.uploadImageUrl)
  //           }
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         // console.log("y",url);
  //       }
  //     });

  // }
}