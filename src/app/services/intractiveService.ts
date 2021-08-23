import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/msg.model';
import { ScheduleMessage } from '../models/schMsg.model';
import { InteractiveMessage, MesssageISend } from '../models/intractiveMessage.model';
import { browserRefresh } from '../app.component';
import { Router } from '@angular/router';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class InetractiveMessageService implements OnInit {
  browserRefresh: any;
  base_url = `${environment.baseUrl}`;
    
  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(browserRefresh === true) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    } else if(JSON.parse(localStorage.getItem('user')).username === null) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    }
  }

    getMsg() {
        let userOne = JSON.parse(localStorage.getItem('user'));
        let username = userOne.username;
        let password = userOne.password;
    
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<InteractiveMessage[]>(`${this.base_url}/getAllAyvuInteractiveMessages`,{headers});
    }

    public getMsgOne(id: string) {
        let user_cur = JSON.parse(localStorage.getItem('user'));
        let username = user_cur.username;
        let password = user_cur.password;
    
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<InteractiveMessage[]>(`${this.base_url}/getAyvuInteractiveMessage/${id}`,{headers});
    }


  public DeleteMsg(msg: InteractiveMessage) {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.delete<InteractiveMessage>(`${this.base_url}/deleteAyvuInteractiveMessageById/${msg.mtsIMId}`, {headers});
  }

  public CreateMsg(msg: InteractiveMessage): Observable<InteractiveMessage> {
    // // console.log(userform);
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpClient.post<InteractiveMessage>(`${this.base_url}/createAyvuInteractiveMessage`, msg, {headers: headersCreate});
  }

  getCategories() {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get(`${environment.baseUrl}/getAllDieaseCategories`, {headers: headersCreate});
  }
 
  getForms() {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get(`${environment.baseUrl}/getAllInteractiveQuestionaireFromUrl`, {headers: headersCreate});
  }

  getAllMsgGp() {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get(`${environment.baseUrl}/getAllInteractiveMessagesByGP`, {headers: headersCreate});
  }
  getTemplates() {
    let userOne = JSON.parse(localStorage.getItem('user'));
    let username = userOne.username;
    let password = userOne.password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<InteractiveMessage[]>(`${this.base_url}/getallTemplets`,{headers});
  }

  public UpdateMessage(msg: InteractiveMessage): Observable<InteractiveMessage> {
    // // console.log(userform);
    // tslint:disable-next-line: variable-name
    const user_cuur = JSON.parse(localStorage.getItem('user'));
    const username = user_cuur.username;
    const password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.put<InteractiveMessage>(`${this.base_url}/updateInteractiveTemplateMessage/${msg.mtsIMId}`, msg, {headers: headersCreate});
  }
  sendMsg() {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const password = user.password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<MesssageISend[]>(`${this.base_url}/getInteractiveMessageToSMS`, {headers});
  }
}
