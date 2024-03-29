import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private basePath = '/uploads';
 
  constructor(private db: AngularFireDatabase) { }
 
  pushFileToStorage(fileUpload: User, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      }
    );
  }
 
  private saveFileData(fileUpload: User) {
    console.log("url" + fileUpload.url);
    console.log("name" + fileUpload.name);
    console.log("key" + fileUpload.key);
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }
 
  getFileUploads(numberItems): AngularFireList<User> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
 
  deleteFileUpload(fileUpload: User) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
 
  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }
 
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
