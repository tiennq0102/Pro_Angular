import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  subject_code:string = "";

  constructor(private questionService: QuestionService,
              private route:ActivatedRoute,
              private router: Router
      ) { }

  ngOnInit(): void {
    this.route.params.subscribe(pam => {
      this.subject_code = pam['monhoc']
      console.log(this.subject_code);
    })
  }

  questionForm: FormGroup = new FormGroup({
    Text:new FormControl(""),
    Marks:new FormControl({value:1,disabled:true}),
    AnswerId:new FormControl(""),
  })
  
  answerForm:FormGroup = new FormGroup({
    id0: new FormControl({value:1}),
    Text0:new FormControl('',Validators.required),
    id1: new FormControl({value:2}),
    Text1:new FormControl('',Validators.required),
    id2: new FormControl({value:3}),
    Text2:new FormControl('',Validators.required),
    id3: new FormControl({value:4}),
    Text3:new FormControl('',Validators.required),
  })

  addQuestion(){
    const Answers = [//tạo mảng lưu lại answer từ answerForm
      {id:this.answerForm.value.id0.value, Text:this.answerForm.value.Text0},
      {id:this.answerForm.value.id1.value, Text:this.answerForm.value.Text1},
      {id:this.answerForm.value.id2.value, Text:this.answerForm.value.Text2},
      {id:this.answerForm.value.id3.value, Text:this.answerForm.value.Text3}
    ];
    let data = {... this.questionForm.value,Marks:1, Answers:Answers}
    console.log(data, this.subject_code)
    // console.log(Answers);
  

    this.questionService.add(data,this.subject_code).subscribe(res => {
      alert("Thêm mới thành công!");
      this.router.navigate(['/admin/question/' + this.subject_code])
    })
  }

}
