import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResumebuilderComponent } from './resumebuilder/resumebuilder.component';
import { AuthGuard } from './Auth/auth.guard';
import { AdminloginComponent } from './Auth/adminlogin/adminlogin.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';

const routes: Routes = [
  { path: '', component: LoginComponent , data: {animation: 'Login'}},
  { path: 'login', component: LoginComponent, data: {animation: 'Login'}},
  { path: 'signup', component: SignUpComponent, data: {animation: 'SignUp' }},
  { path: 'adminlogin', component: AdminloginComponent, data: {animation: 'Admin'}},
  { path: 'add-user', component: AddUserComponent,  canActivate : [AuthGuard]},
  { path: 'list-user', component: ListUserComponent,  canActivate : [AuthGuard]},
  { path: 'edit-user', component: EditUserComponent, canActivate : [AuthGuard]},
  { path: 'resume-builder', component: ResumebuilderComponent, canActivate : [AuthGuard]},
  { path: 'company-profile', component: CompanyprofileComponent, canActivate : [AuthGuard]},
  { path: 'file-upload', component: FormUploadComponent, canActivate : [AuthGuard]},
  { path: 'list-view', component: ListUploadComponent, canActivate : [AuthGuard]},
  { path: 'detail-upload', component: DetailUploadComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard ]
})
export class AppRoutingModule { }
