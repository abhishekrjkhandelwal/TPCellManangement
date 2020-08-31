import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: User;
  progress: { percentage: number } = { percentage: 0 };
 
  constructor(private uploadService: UploadFileService) { }
 
  ngOnInit() {
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
 
    this.currentFileUpload = new User(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
}
