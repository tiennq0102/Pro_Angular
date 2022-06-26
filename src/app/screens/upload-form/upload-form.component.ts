import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  uploadFile: string = "";
  private basePath = '/uploads';
  constructor(private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
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
