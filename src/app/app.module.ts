import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user/list-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatProgressSpinnerModule,
MatButtonModule, MatTableModule, MatSnackBarModule, MatFormFieldModule, MatToolbarModule, MatProgressBarModule} from '@angular/material';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HeaderComponent } from './header/header.component';
import { ResumebuilderComponent } from './resumebuilder/resumebuilder.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AdminloginComponent } from './Auth/adminlogin/adminlogin.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { CompanyprofileComponent } from './companyprofile/companyprofile.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUserComponent,
    EditUserComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    ResumebuilderComponent,
    LandingpageComponent,
    AdminloginComponent,
    AdminheaderComponent,
    CompanyprofileComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailUploadComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
