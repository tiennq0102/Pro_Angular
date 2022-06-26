import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  students: Array<any> = [];
  subjects: Array<any> = [];
  constructor(private studentService: StudentService, 
              private subjectService : SubjectService,
              private route: ActivatedRoute,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.listStudent();
    this.listSubject();
  }
  listStudent(keyword: string = ""){
    this.studentService.list(keyword).subscribe(data => {
      this.students = data;
    });
  }
  listSubject(){
    this.subjectService.list().subscribe(lstSubject =>{
      this.subjects = lstSubject;
    })
  }
  search(e: any){
    let keyword = e.target.value;
    this.listStudent(keyword);
  }
 
}
