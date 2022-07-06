import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './components/Drag and Drop/uploader/uploader.component';
import { ImageAllComponent } from './components/image-all/image-all.component';
import { UploadFormComponent } from './components/single upload/upload-form/upload-form.component';

const routes: Routes = [
  {path: "", redirectTo:"/home",pathMatch:"full"},
  {path:"DragAndDrop", component:UploaderComponent},
  {path:"singleupload", component:UploadFormComponent},
  {path:"all", component:ImageAllComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
