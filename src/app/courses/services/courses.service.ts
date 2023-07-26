import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/api/courses';

  constructor(private httpClient: HttpClient) { }

  list(){
      return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        tap(courses => console.log(courses))
      );

  }
  save(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record);

  }
    // Método para deletar um curso pelo ID
    deleteCourseById(_id: string): Observable<void> {
      const url = `${this.API}/del/${_id}`;
      return this.httpClient.delete<void>(url);
    }
}
