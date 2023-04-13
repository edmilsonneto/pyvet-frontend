import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PyvetService {
  private endpoint = 'api/chat';

  constructor(private http: HttpClient) { }

  sendMessage(prompt: string): Observable<any> {
    const body = { prompt };
    return this.http.post<any>(`${environment.api}/${this.endpoint}`, body);
  }
}
