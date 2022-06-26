import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router) { }
  
  ngOnInit(): void {
    
  }

  
  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(authData => {
        this.authService.login(authData.email, authData.id)// gọi đến hàm login ở authService, tìm ra student theo email và id
        .subscribe(response => {
          console.log(response)
          if(response){
            this.router.navigate(['/']);//đăng nhập thành công thì dùng navigate chuyển về trang chủ
          }else{
            alert("Tài khoản không tồn tại")
          }
           
        })
      })
  }

}
