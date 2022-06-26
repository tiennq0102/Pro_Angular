import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }
  list(keyword: string = ""):Observable<any>{ // gọi hàm list trả ra 1 Observable 
    return this.http.get<any>(`${environment.subject_api}?Name_like=${keyword}`); //lấy toàn bộ subject
  }
  add(data: any): Observable<any>{
    return this.http.post<any>(environment.subject_api, {...data});
  }
  find(id:number): Observable<any>{
    return this.http.get<any>(`${environment.subject_api}/${id}`)
  }
  update(obj:any): Observable<any>{
    return this.http.put<any>(`${environment.subject_api}/${obj.id}`, {...obj});
  }
  delete(id:number): Observable<any>{
    return this.http.delete<any>(`${environment.subject_api}/${id}`)
  }
}
