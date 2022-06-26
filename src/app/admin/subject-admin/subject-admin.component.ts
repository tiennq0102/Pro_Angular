import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-subject-admin',
  templateUrl: './subject-admin.component.html',
  styleUrls: ['./subject-admin.component.css']
})
export class SubjectAdminComponent implements OnInit {
  subjects: Array<any> = []
  constructor(
    private http: HttpClient,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(keyword:string = ""){
    this.subjectService.list(keyword).subscribe(data => {
      this.subjects = data;
      console.log(data)
    })
  }
  deleteSub(id: number){
    // this.studentService.delete()
    return this.subjectService.delete(id).subscribe(data => {
      this.getAll();
    })
  }
  search(e: any){
    let keyword = e.target.value;
    this.getAll(keyword);
  }

}
