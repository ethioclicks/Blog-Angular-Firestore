import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreatePostComponent } from '../components/Post/create-post/create-post.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  posts: Observable<any[]>;
  constructor(private dialog: MatDialog, firestore:AngularFirestore) {
    this.posts = firestore.collection('posts').valueChanges();
   }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CreatePostComponent, {
      width: '30%'
    });
  }
}
