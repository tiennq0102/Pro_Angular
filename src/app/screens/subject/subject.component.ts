import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Array<any> = [];
  constructor(private subjectService: SubjectService,
              private router: Router
    ) { }
  listSubject(keyword: string = ""){
    this.subjectService.list(keyword).subscribe(lstSubject =>{ //gọi đến hàm list trong subjectService
     //subscribe là hàm để nhận kết quả trả về, lstSubject là biến nhận kq và được gán lại vào mảng subjects được khởi tạo bên trên
      this.subjects = lstSubject
    })
  }
  ngOnInit(): void {
    this.listSubject();
  }
  search(e: any){
    let keyword = e.target.value;
    this.listSubject(keyword);
  }


}
