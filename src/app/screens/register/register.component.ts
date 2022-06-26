import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { comparePasswordValidator } from 'src/app/helpers/conparePassword';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword:new FormControl('',[
      Validators.required,
    ]),
    birth_date:new FormControl(new Date(),[
      Validators.required
    ]),
    address:new FormControl('',Validators.required),
  })

  constructor(private studentService: StudentService,
              private router:Router
    ) { }
  

  ngOnInit(): void {
    this.registerForm.controls['confirmPassword'].valueChanges.subscribe(data =>{
      this.registerForm.controls['confirmPassword'].addValidators([
        comparePasswordValidator(this.registerForm.controls['password'].value)
      ]);
    })
  }


  addStudent(){
    let data = {...this.registerForm.value}
    delete data.confirmPassword;
    this.studentService.add(data).subscribe(resp => {
      this.router.navigate(['/'])
    })
  }
}
