import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  constructor(private http:HttpClient) { }

  get categories$(): Observable<Category[]>{
    return this.http.get(`${environment.apiUrl}/Category`).pipe(
      tap(console.log),
      map((list: any[]): Category[] => list.map(Category.fromJson))
    )
  }
}
