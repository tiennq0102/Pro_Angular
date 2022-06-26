import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './admin/add-question/add-question.component';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { AddSubjectComponent } from './admin/add-subject/add-subject.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EditQuestionComponent } from './admin/edit-question/edit-question.component';
import { EditStudentComponent } from './admin/edit-student/edit-student.component';
import { EditSubjectComponent } from './admin/edit-subject/edit-subject.component';
import { QuestionAdminComponent } from './admin/question-admin/question-admin.component';
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { SubjectAdminComponent } from './admin/subject-admin/subject-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { FinalComponent } from './screens/final/final.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { RegisterComponent } from './screens/register/register.component';
import { SubjectComponent } from './screens/subject/subject.component';
import { UploadFormComponent } from './screens/upload-form/upload-form.component';

const routes: Routes = [
  {
    path:"", //đường dẫn
    component:HomeLayoutComponent, //nơi xử lý
    children:[//những trang bên trong children đều được kế thừa HomeLayout
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"mon-hoc",
        component:SubjectComponent
      },
      {
        path:"quiz/:monhoc",//đi đến trang quiz kèm tham số đường dẫn
        component:QuizComponent
      },
      {
        path:"ket-qua/:idStudent/:monhoc",
        component:FinalComponent
      },
    ]
  },
  {
    path:"admin", //đường dẫn
    component:AdminLayoutComponent, //nơi xử lý
    children:[//những trang bên trong children đều được kế thừa HomeLayout
      {
        path:"",
        component:DashboardComponent
      },
      // Student
      {
        path:"student",
        component:StudentAdminComponent
      },
      {
        path:"add-student",
        component:AddStudentComponent
      },
      {
        path:"edit-student/:idStudent",
        component:EditStudentComponent
      },
      //Subject
      {
        path:"subject",
        component:SubjectAdminComponent
      },
      {
        path:"add-subject",
        component:AddSubjectComponent
      },
      {
        path:"edit-subject/:idSubject",
        component:EditSubjectComponent
      },
      //Question
      {
        path:"question/:monhoc",
        component:QuestionAdminComponent
      },
      {
        path:"add-question/:monhoc",
        component:AddQuestionComponent
      },
      {
        path:"edit-question/:Qid/:monhoc",
        component:EditQuestionComponent
      },
    ]
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"upload-file",
    component:UploadFormComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
