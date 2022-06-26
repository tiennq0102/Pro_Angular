import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './screens/register/register.component';
import { HttpClientModule} from '@angular/common/http';
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { SubjectComponent } from './screens/subject/subject.component';
import { SubjectAdminComponent } from './admin/subject-admin/subject-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { QuestionAdminComponent } from './admin/question-admin/question-admin.component';
import { FinalComponent } from './screens/final/final.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { EditStudentComponent } from './admin/edit-student/edit-student.component';
import { AddSubjectComponent } from './admin/add-subject/add-subject.component';
import { EditSubjectComponent } from './admin/edit-subject/edit-subject.component';
import { AddQuestionComponent } from './admin/add-question/add-question.component';
import { EditQuestionComponent } from './admin/edit-question/edit-question.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { UploadFormComponent } from './screens/upload-form/upload-form.component';
import { FormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SubjectComponent,
    QuizComponent,
    HomeLayoutComponent,
    RegisterComponent,
    StudentAdminComponent,
    SubjectAdminComponent,
    AdminLayoutComponent,
    QuestionAdminComponent,
    FinalComponent,
    DashboardComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers:[
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
