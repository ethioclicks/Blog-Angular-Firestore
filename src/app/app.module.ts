import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
    // AngularFireUploadTask,

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { CreatePostComponent } from './components/Post/create-post/create-post.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ListPostComponent } from './components/Post/list-post/list-post.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Instructions ---->
// Replace configPlaceholder with your firebase credentials
import { UploaderComponent } from './components/Drag and Drop/uploader/uploader.component';
import { UploadTaskComponent } from './components/Drag and Drop/upload-task/upload-task.component';
import { DropzoneDirective } from './components/Drag and Drop/dropzone.directive';
import { UploadFormComponent } from './components/single upload/upload-form/upload-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageAllComponent } from './components/image-all/image-all.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreatePostComponent,
    ListPostComponent,
    UploaderComponent,
    UploadTaskComponent,
    DropzoneDirective,
    UploadFormComponent,
    ImageAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
