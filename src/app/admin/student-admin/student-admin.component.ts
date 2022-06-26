import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent implements OnInit {
  students: Array<any> = [];
// import service
  constructor(private studentService: StudentService,
              private http: HttpClient
    ) { }

  

  ngOnInit(): void {
    this.getAll();
  }

  getAll(keyword: string = ""){
    this.studentService.list(keyword).subscribe(data => {
      // console.log(data);
      this.students = data;
      console.log(this.students)
    })
  }

  deleteStu(id: number){
    // this.studentService.delete()
    return this.studentService.delete(id).subscribe(data => {
      this.getAll();
    })
  }
  search(e: any){
    let keyword = e.target.value;
    this.getAll(keyword);
  }
}
