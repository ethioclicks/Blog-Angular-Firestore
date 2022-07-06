import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup,FormBuilder,Validators, NgForm, FormControl } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-image-all',
  templateUrl: './image-all.component.html',
  styleUrls: ['./image-all.component.css']
})
export class ImageAllComponent implements OnInit {
  postForm !: FormGroup;
  singleImageUrl: string;
  multipleImageUrl: string[];
  postby:string;
  postdes:string;
  postTitle:string;
  postForms = new FormGroup({
    title: new FormControl('',Validators.required),
    desc: new FormControl('',Validators.required),
    postby: new FormControl ('',Validators.required),
    imageSource: new FormControl(null)
  })
  constructor(private fireservice: FirebaseService,private firestore:AngularFirestore, private fileservice: FileUploadService) { }

  ngOnInit(): void {
    
  }
  singleUploadImage(event){
    this.singleImageUrl = event;
    console.log("This --- is the url ," + event);
    this.postForms.patchValue({
      imageSource:this.singleImageUrl
    })
  }
  SaveData(){
    console.log(this.postForms.value);
      this.addPost(this.postForms.value).then(() => {
        console.log("Post added succesfully");
      }).catch(error =>{
        console.log(error);
      })
  }
  addPost(post: any){
    post['images'] = this.fileservice.getUrls();
    return this.firestore.collection('posts').add(post);
  }
  
}
