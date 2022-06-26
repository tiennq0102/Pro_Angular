import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  uploadFile: string = "";
  private basePath = '/uploads';

  constructor(private subjectService: SubjectService,
              private router: Router,
              private fireStorage: AngularFireStorage
    ) { }

  ngOnInit(): void {
  }


  subjectForm:FormGroup = new FormGroup({
    Code:new FormControl('',Validators.required),
    Name:new FormControl('',[
      Validators.required,
    ]),
    Logo:new FormControl('',Validators.required),
  })
  addSubject(){
    let dataSubject = {...this.subjectForm.value, Logo:this.uploadFile}
    // console.log(dataSubject)
    this.subjectService.add(dataSubject).subscribe(data => {
      alert("Thêm mới thành công");
      this.router.navigate(['/admin/subject'])
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
