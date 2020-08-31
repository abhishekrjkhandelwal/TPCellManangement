import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})

export class ListUserComponent implements OnInit {

  fileUploads: any[];
  public user: User[];
  public value: number;
  public errorMsg;
  public displayedColumns: string[] = ['name', 'url'];
  public datasource = [];
  public id = 1;
  constructor(private router: Router, private userService: UserService, private uploadService: UploadFileService ) { }


  ngOnInit() {
    this.getAllUsers();
    // Use snapshotChanges().pipe(map()) to store the key
  }

  // get all users information
  getAllUsers() {
   this.uploadService.getFileUploads(6).snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(fileUploads => {
    console.log("fileuploads" + JSON.stringify(fileUploads));
    this.fileUploads = fileUploads;
    console.log('fileuploads' + this.fileUploads);
    this.datasource = fileUploads;
  });
  }

  // delete id form list
  removeFromList(item) {
     const index = this.user.indexOf(item);
     this.user.splice(index, 1); // Removes one element, starting from index
   }

  // delete user from list
  deleteUser(id: number) {
    this.userService.deleteUserById(id)
      .subscribe(successCode => {
           this.removeFromList(id);
        });
  }

  // route for add user
  adduser() {
    this.router.navigate(['add-user']);
  }

  // route for edit user
  updateUser() {
    this.router.navigate(['edit-user']);
  }


  // delete user by id
 deleteByID(value) {
   console.log('value' + value);
  for (const u of this.user) {
    console.log('uid' + u.id);
    console.log('----------->' + value);
    if (u.id == value) {
      this.userService.deleteUserById(value)
      .subscribe(successCode => {
           this.removeFromList(value);
           this.getAllUsers();
        });
    }
  }
 }
}