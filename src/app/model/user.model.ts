export class User {
   id?: number;
   name?: string;
   email: string;
   password: string;
   mobileno?: string;
   key?: string;
   filename?: string;
   url?: string;
   file?: File;

   constructor(file: File) {
      this.file = file;
  }
  
}
