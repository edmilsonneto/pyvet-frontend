import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PyvetService {

  private apiUrl = 'http://localhost:5000/api/chat';

  constructor(private http: HttpClient) { }

  sendMessage(prompt: string): Observable<any> {
    const body = { prompt };
    return this.http.post<any>(this.apiUrl, body);
  }
}
