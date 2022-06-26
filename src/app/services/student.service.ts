import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

    list(keyword: string = ""): Observable<any>{
      return this.http.get<any>(`${environment.student_api}?email_like=${keyword}`);
    }
    add(data: any): Observable<any>{
      return this.http.post<any>(environment.student_api, {...data});
    }
    find(id:number): Observable<any>{
      return this.http.get<any>(`${environment.student_api}/${id}`)
    }
    update(obj:any): Observable<any>{
      return this.http.put<any>(`${environment.student_api}/${obj.id}`, {...obj});
    }
    delete(id:number): Observable<any>{
      return this.http.delete<any>(`${environment.student_api}/${id}`)
    }

}
