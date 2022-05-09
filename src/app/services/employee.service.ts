import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from './employee.model';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  postEmployee(data: Employee){
    return this.http.post<Employee>("http://localhost:3000/posts", data)
      .pipe(map((res: Employee) => {
        return res;
      }))
  }

  getEmployee(){
    return this.http.get<Employee>("http://localhost:3000/posts")
      .pipe(map((res: Employee) => {
        return res;
      }))
  }

  putEmployee(data: Employee, id: number){
    return this.http.put<Employee>("http://localhost:3000/posts" + id, data)
      .pipe(map((res: Employee) => {
        return res;
      }))
  }

  deleteEmployee(id: number){
    return this.http.delete<Employee>("http://localhost:3000/posts" + id)
      .pipe(map((res: Employee) => {
        return res;
      }))
  }
}
