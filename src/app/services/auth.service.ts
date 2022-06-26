import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginUser: BehaviorSubject<any>;
  //
  constructor(private http: HttpClient) { 
    this.loginUser = new BehaviorSubject(JSON.parse(localStorage.getItem('login_user') || "{}"));
  }

  getLoggedInUser(){
    return this.loginUser.value
  }


  login(email: string, ggId: string):Observable<any>{
    return this.http.get<any>(`${environment.student_api}?email=${email}&googleId=${ggId}`) //lấy ra student theo email hoặc ggId
    .pipe( //pipe giúp kiểm tra được kiểu (can thiệp) dữ liệu trả về của Observable
      map(data => {//chạy qua từng phần tử của dữ liệu trả về và chuyển kiểu dl trả về sang 1 kiểu dl khác do mình đặt ra
        console.log(data);// trong bài này chuyển từ 1 mảng sang 1 object
        // return data;
        if(data.length>0){
          this.loginUser.next(data[0])//gán giá trị gọi hàm next và truyền dl vào
          localStorage.setItem('login_user', JSON.stringify(data[0]));
          return data[0];
        }else{//nếu không có tài khoản thì xóa hết dữ liệu hiện có và k lưu j vào localStorage
          localStorage.removeItem('login_user');
          this.loginUser.next({})
          return null;
        }
      })
    )
  }
}
