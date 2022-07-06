import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { FirebaseService } from '../../../services/firebase.service';
@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})

export class ListPostComponent implements OnInit {
  Posts:any [] =[];
  files:any [] = [];
  downloadURL: any ;
  displayedColumns: string[] = ['postBy', 'postDescription','postTitle'];
  dataSource = this.Posts;
  constructor(private dialog: MatDialog, private fireService: FirebaseService) { }
  ngOnInit(): void {
    this.getPosts();
    this.getfiles();
  }
  openDialog() {
    this.dialog.open(CreatePostComponent, {
      width: '30%'
    });
  }
  getPosts(){
    this.fireService.getPost().subscribe(data => {
      this.Posts = [];
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        this.Posts.push({
          id: element.payload.doc.id,
          ... element.payload.doc.data()
        })
      });
    })
  }
  getfiles(){
    this.fireService.getfiles().subscribe(data => {
      this.files = [];
      data.forEach((element:any) => {
        this.files.push({
          downloadURL: element.payload.doc.downloadURL,
          ... element.payload.doc.data()
          
        })
      });
  })
}
  DeletePost(id: string) {
    this.fireService.deletePost(id).then(() => {
      console.log("Succesfully deleted");
    }).catch(error => {
      console.log(error);
    })
  }
  UpdatePost(id:string, data: string){
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '30%'
    })
    dialogRef.componentInstance.isEdit = true;
    dialogRef.componentInstance.postid = id;
    dialogRef.componentInstance.formData = data;
    // dialogRef.afterClosed().subscribe(response => {
      
    // })
  }
}
