import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {
  isLoggedIn: Boolean = false;
  loggedInUser: any = null;
  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
      ) { }

  ngOnInit(): void {
    this.authService.loginUser.subscribe(user => {
      // debugger;
      // console.log('HomeLayoutComponent', user)
      if(user.email != undefined && user.googleId != undefined){
        this.isLoggedIn = true;
        this.loggedInUser = user;
      }
    })
  }
  Logout(){
    localStorage.removeItem('login_user');
    this.router.navigate(['/']);
  }

}
