import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  list(subject_code: string):Observable<any>{
    return this.http.get<any>(`${environment.base_api}/${subject_code}`)
  }
  add(data: any,subject_code:any): Observable<any>{
    return this.http.post<any>(`${environment.base_api}/${subject_code}`, {...data});
  }
  find(id:number,subject_code:any): Observable<any>{
    return this.http.get<any>(`${environment.base_api}/${subject_code}/${id}`)
  }
  update(obj:any,subject_code:any): Observable<any>{
    return this.http.put<any>(`${environment.base_api}/${subject_code}/${obj.id}`, {...obj});
  }
  delete(id:number,subject_code:any): Observable<any>{
    return this.http.delete<any>(`${environment.base_api}/${subject_code}/${id}`)
  }

}
