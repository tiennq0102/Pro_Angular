import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Array<any> = [];
  subject_code: string = "";
  user_answer: Array<any> = [];
  students: Array<any> = [];
  
  constructor(private route:ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private questionService: QuestionService
      ) { }//khi vào web khởi tạo hàm constructor đầu tiên

  ngOnInit(): void {//sau khi khởi tạo constructor thì khởi tạo hàm OnInit
    //1. Lấy tham số đường dẫn. 
    this.route.params.subscribe(pam => {
      // debugger;
      this.subject_code = pam['monhoc'];//monhoc phải giống với  path:"quiz/:monhoc" trong router
      this.getQuestion(this.subject_code)
    })
    //2. Gọi Service để lấy danh sách câu hỏi
  }
  getStudents(){
    this.studentService.list()
    .subscribe(lstStudent => {
      this.students = lstStudent;
    })
  }
  getQuestion(code: string){

    this.questionService.list(code)//gọi hàm list và lấy ra danh sách question theo code mã môn
    .subscribe(lstQuestion => { //dữ liệu trả về sau reques
      let randArr = this.getDistinctNumberArray(10, lstQuestion.length);
      //tạo ra 1 mảng có 10 phần tử, chạy từ 0 đến 80
      //lstQuestion.length: số câu hỏi:  80
      this.questions = lstQuestion.filter((el: any, ind: number) => { //chạy vòng lặp qua các phần tử của biến lstQuestion
        if(randArr.includes(ind)){ //nếu số ind xuất hiện trong mảng randArr, thì phần tử đang được chạy sẽ add vào mảng questions
          return true;
        }else{
          return false;
        }
      })
      console.log(this.questions);
    })
  }
  private getDistinctNumberArray(amount:number, max:number): Array<any>{//amount: số lượng câu hỏi
    let arr: Array<any> = [];
    while(arr.length< amount){
      let ramdomNumber = Math.floor(Math.random() * max);//floor: làm tròn số
      if(!arr.includes(ramdomNumber)){//includes: kiểm tra 1 phần tử có thuộc 1 mảng cho trc k,có trả về true,ngược lại là false
        arr.push(ramdomNumber)//nếu không có sẽ thêm vào phần tử cuối cùng của mảng đó.
      }
    }
    return arr;

  }
  choose(qId:number, aId:number):void{
    // console.log(qId, aId)
    let existed = -1;
    this.user_answer.forEach((el:any, index: number) => {
      if(el.qId == qId){
        existed = index;
      }
    });
    if(existed == -1){ //existed==false
      this.user_answer.push({
        qId: qId, //tạo ra thuộc tính qId gán = qId dc truyền vào
        aId: aId
      })
    }else{
      this.user_answer[existed].aId = aId
    }
    // console.log(this.user_answer);
  }
  submit(){
    let correctAnswer = 0;
    this.user_answer.forEach((ans: any) => {
      let question = this.questions.find((item:any) => item.id == ans.qId);
      if( question && question.AnswerId == ans.aId){
        correctAnswer++;
      }
    });
    // console.log(correctAnswer, this.questions.length)
    const score = (correctAnswer*10/this.questions.length);

    // tính được điểm xong sẽ tìm thông tin sv và cập nhật điểm vào
    let infoSV =JSON.parse(`${localStorage.getItem("login_user")}`);
    this.studentService.find(infoSV.id).subscribe((stu:any) => {
      // console.log(stu)
      stu.marks[this.subject_code] = score.toFixed(2);//làm tròn điểm đến 2 số thập phân
      // console.log(stu)
      this.studentService.update(stu)
      .subscribe(data => {
        this.router.navigate(['/ket-qua', data.id, this.subject_code])//(đường dẫn, tham số 1, tham số 2)
      })
    })
  }
}
