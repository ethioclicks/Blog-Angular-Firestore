import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore:AngularFirestore) { }

  addPost(post: any){
    return this.firestore.collection('posts').add(post);
  }
  getPost():Observable<any> {
    return this.firestore.collection('posts').snapshotChanges();
  }
  getfiles():Observable<any> {
    return this.firestore.collection('files').snapshotChanges();
  }
  deletePost(id:string){
    return this.firestore.collection('posts').doc(id).delete();
  }
  updatepost(id:string, data: any){
    return this.firestore.collection('posts').doc(id).update(data);
  }
}
