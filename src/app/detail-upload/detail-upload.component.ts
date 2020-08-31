import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../fileupload';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-detail-upload',
  templateUrl: './detail-upload.component.html',
  styleUrls: ['./detail-upload.component.css']
})
export class DetailUploadComponent implements OnInit {


  @Input() fileUpload: FileUpload;
  constructor(private uploadService: UploadFileService) { }
  ngOnInit() {
  }
  deleteFileUpload(fileUpload) {
    console.log('hello' + fileUpload.url);
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
