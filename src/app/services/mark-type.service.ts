import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { MarkType } from '../models/MarkType';


@Injectable({
  providedIn: 'root'
})
export class MarkTypeService {
  private markTypeUrl = environment.apiBaseUrl + '/markTypes';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getMarkType(): Observable<any> {
    return this.httpClient
      .get<any>(this.markTypeUrl, {headers: this.authService.getHeaders()})
      
  }
}
 