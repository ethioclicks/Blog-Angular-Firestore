import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  isEdit: boolean = false;
  postid: string= '';
  formData: any;
  postForm !: FormGroup;
  isSubmitted:boolean = false;
  constructor(private formBuilder : FormBuilder, private fireservice: FirebaseService, public dialogRef: MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postBy : ['',Validators.required],
      postTitle : ['',Validators.required],
      postDescription : ['',Validators.required],
    })
    if(this.isEdit){
      this.postForm.patchValue(this.formData);
    }
  }
  AddPost(){
    this.isSubmitted = true;
    if(this.postForm.valid){
      this.fireservice.addPost(this.postForm.value).then(() => {
        console.log("Post added succesfully");
      }).catch(error =>{
        console.log(error);
      })
    }
    console.log(this.postForm);
  }
  updatePost(){
    // debugger
    if(this.postid != '' && this.postForm.value){
      this.fireservice.updatepost(this.postid, this.postForm.value);
    }
    this.dialogRef.close({isEdit:true, data:this.postForm.value});
  }
}
