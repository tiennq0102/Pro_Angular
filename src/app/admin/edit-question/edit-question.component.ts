import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  subject_code:string = "";
  Qid:number = 0;
  answers: Array<any> = [];
  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(pam => {
      // console.log(pam)
      this.Qid = pam['Qid'];
      this.subject_code = pam['monhoc'];
      // console.log(this.Qid, this.subject_code)
      this.getInfo();
    })
  }
  getInfo(){
    this.questionService.find(this.Qid,this.subject_code).subscribe(data => {
      console.log(data)
      // console.log(data.Answers)

      // this.answers = data.Answers;//gán mảng câu trả lời vào this.answers
      this.questionForm.setValue({//đưa dữ liệu câu hỏi lên form
        id:data.id,
        Text:data.Text,
        Marks:data.Marks,
        AnswerId:data.AnswerId,
      })
      this.answerForm.setValue({//đưa dữ liệu câu trả lời lên form
        id0:data.Answers[0].id,
        Text0:data.Answers[0].Text,
        id1:data.Answers[1].id,
        Text1:data.Answers[1].Text,
        id2:data.Answers[2].id,
        Text2:data.Answers[2].Text,
        id3:data.Answers[3].id,
        Text3:data.Answers[3].Text,
      })
    })
  }

  questionForm:FormGroup = new FormGroup ({
    id: new FormControl({value:0,disabled:true}),
    Text:new FormControl('',Validators.required),
    Marks:new FormControl('',Validators.required,),
    AnswerId:new FormControl('',Validators.required),
  })

  answerForm:FormGroup = new FormGroup({
    id0: new FormControl({value:0}),
    Text0:new FormControl('',Validators.required),
    id1: new FormControl({value:0}),
    Text1:new FormControl('',Validators.required),
    id2: new FormControl({value:0}),
    Text2:new FormControl('',Validators.required),
    id3: new FormControl({value:0}),
    Text3:new FormControl('',Validators.required),
  })
  


  saveEdit(){
    const Answers = [//tạo mảng lưu lại answer từ answerForm
      {id:this.answerForm.value.id0, Text:this.answerForm.value.Text0},
      {id:this.answerForm.value.id1, Text:this.answerForm.value.Text1},
      {id:this.answerForm.value.id2, Text:this.answerForm.value.Text2},
      {id:this.answerForm.value.id3, Text:this.answerForm.value.Text3}
    ];
    const question = {... this.questionForm.value, id:this.Qid, Answers:Answers}
    console.log(question)
    this.questionService.update(question, this.subject_code).subscribe(res =>{
      this.router.navigate(['/admin/question/' + this.subject_code])
    })
  }



}
