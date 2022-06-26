import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  student: any;
  subject_code: string = "";
  score: number = 0;
  result: string = "";

  constructor(private route: ActivatedRoute,
              private studentService: StudentService
    
    ) { }

  ngOnInit(): void {
    //lấy ra mã môn, id sinh viên
    this.route.params.subscribe(pam => {
      this.studentService.find(Number(pam['idStudent']))
      .subscribe(stu => {
        this.subject_code = pam['monhoc'];
        console.log(stu.marks[this.subject_code],this.subject_code) //hiển thị điểm
        this.score = stu.marks[this.subject_code];
        
      })
    })
  }
  

}
