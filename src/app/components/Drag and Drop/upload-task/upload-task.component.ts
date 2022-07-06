import { Component, OnInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';
 
@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {
 
  @Input() file: File;
 
  @Output()onMultipleImageUploaded: EventEmitter<string> = new EventEmitter()
  task: AngularFireUploadTask;
 
  percentage: Observable<number | undefined>;
  snapshot: Observable<any>;
  downloadURL: string;
  imageUrl: [] =[];
  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private fileservice: FileUploadService) { }
 
  ngOnInit() {
    this.startUpload();
    
    this.fileservice.clearUrls();
  }
 
  startUpload() {
 
    // The storage path
    const path = `upload/${Date.now()}_${this.file.name}`;
 
    // Reference to storage bucket
    const ref = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, this.file);
 
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
 
    this.snapshot   = this.task.snapshotChanges().pipe(
      // tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
  
           console.log('The download urls '+this.downloadURL);
          this.fileservice.addUploadedUrl(this.downloadURL);
        //this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }
 
  isActive(snapshot: { state: string; bytesTransferred: number; totalBytes: number; }) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
 
}