import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  idStu: number = 0;
  // -------------------------
  uploadFile: string = "";
  private basePath = '/uploads';
  // ---------------------------
  constructor(
              private route: ActivatedRoute,
              private studentService: StudentService,
              private router:Router,
              private fireStorage: AngularFireStorage
              
  ) { }


  studentForm:FormGroup = new FormGroup ({
    id: new FormControl({value:0,disabled:true}),
    name:new FormControl('',Validators.required),
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ]),

    googleId:new FormControl('',Validators.required),
    // avatar:new FormControl(''),
    // marks:new FormControl('',Validators.required),
  })
  ngOnInit(): void {
    this.showInfo();
    
  }

  showInfo(){
    this.route.params.subscribe(pam => {
      this.studentService.find(pam['idStudent']).subscribe(data => {
        this.idStu = data.id;
        console.log(data);
        this.uploadFile = data.avatar;
        this.studentForm.setValue({//đưa dữ liệu lên form
          id:data.id,
          name:data.name,
          email:data.email,
          googleId:data.googleId,
        })
      })
    })
  }

  saveEdit(){
    
    const student = {... this.studentForm.value, id:this.idStu, avatar:this.uploadFile}
    console.log(student)
    this.studentService.update(student).subscribe(res =>{
      this.router.navigate(['/admin/student'])
    })
  }

  
  chooseFile(event:any){
    let file = event.target.files[0]; //lấy file từ form
    console.log(file)
    
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
