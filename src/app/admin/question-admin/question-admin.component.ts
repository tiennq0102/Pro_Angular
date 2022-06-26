import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.css']
})
export class QuestionAdminComponent implements OnInit {

  subject_code: string = "";
  questions: Array<any> = [];


  constructor(private questionService: QuestionService,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(pam => {
      // console.log(pam)
      this.subject_code = pam['monhoc'];
      this.getAllQues(this.subject_code);
    })
  }
  getAllQues(code:string){
    this.questionService.list(code).subscribe(data => {
      this.questions = data;
      console.log(this.questions)
    })
  }
  deleteQues(id: number){
    // this.studentService.delete()
    return this.questionService.delete(id,this.subject_code).subscribe(data => {
      this.getAllQues(this.subject_code);
    })
  }
}
