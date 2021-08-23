import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionary } from '../models/questonary';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService{
  browserRefresh: any;
  base_url = `${environment.baseUrl}`;
    
  constructor(
    private httpClient:HttpClient,
  ) { }

  public CreateQuestionary(form: Questionary): Observable<Questionary> {
    // // console.log(userform);
    // let user_cuur = JSON.parse(localStorage.getItem('user'));
    // let username = user_cuur.username;
    // let password = user_cuur.password;

    // const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa('' + ':' + password) });
    return this.httpClient.post<Questionary>(`${environment.baseUrl}/saveQuestionnaire`, form);
  }

  public CreateQuestionaryForm(id){
    // // console.log(userform);
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = `SuperAdmin`;
    let password = `don`;
    
    // const params = new HttpParams()
    // .set('id', id)
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    return this.httpClient.get(`${environment.baseUrl}/interactiveQuestionaireForms/id=${id}`);
  }

 
}
