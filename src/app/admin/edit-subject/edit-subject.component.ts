import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  sId:string = "";
  uploadFile: string ="";
  private basePath = '/uploads';
  // ---------------------
  constructor(private subjectService: SubjectService,
              private route: ActivatedRoute,
              private router: Router,
              private fireStorage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  subjectForm:FormGroup = new FormGroup({
    id: new FormControl({value:0,disabled:true}),
    Code:new FormControl('',Validators.required),
    Name:new FormControl('',[
      Validators.required,
    ]),
    // Logo:new FormControl('',Validators.required),
  })

  getInfo(){
    this.route.params.subscribe(pam => {
      this.subjectService.find(pam['idSubject']).subscribe(data => {
        console.log(data)
        this.sId = data.id;
        this.uploadFile = data.Logo;
        this.subjectForm.setValue({
          id:data.id,
          Name:data.Name,
          Code:data.Code,
        })
      })
    })
  }
  saveEdit(){
    const subject = {...this.subjectForm.value,id:this.sId, Logo:this.uploadFile}
    console.log(subject);
    this.subjectService.update(subject).subscribe(res =>{
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
