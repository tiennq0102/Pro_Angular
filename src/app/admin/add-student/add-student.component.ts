import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  uploadFile: string = "";
  private basePath = '/uploads';

  constructor(private studentService: StudentService,
              private router: Router,
              private fireStorage: AngularFireStorage
      ) { }

  ngOnInit(): void {}

  studentForm:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ]),

    googleId:new FormControl('',Validators.required),
    avatar:new FormControl('',Validators.required),
    marks:new FormControl('',Validators.required),
  })

  addStudent(){
    let data = {...this.studentForm.value, avatar:this.uploadFile}
    // this.studentForm.value.avatar = this.uploadFile;
    console.log(data);
    this.studentService.add(data).subscribe(data => {
      alert("Thêm mới thành công");
      this.router.navigate(['/admin/student'])
      console.log(data)
    })
  }


  chooseFile(event:any){
    let file = event.target.files[0]; //lấy file từ form
    const filePath = `${this.basePath}/${file.name}`;//tạo đường dẫn để lưu trữ
    const storageRef = this.fireStorage.ref(filePath);//tạo liên kết giữa dự án vs firebase
    this.fireStorage.upload(filePath, file)
    .snapshotChanges()
    .pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL);
          this.uploadFile = downloadURL;
        });
      })
    ).subscribe();
  }
}
