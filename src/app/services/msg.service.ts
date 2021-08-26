import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, AyuvMessage} from '../models/msg.model';
import { browserRefresh } from '../app.component';
import { Router } from '@angular/router';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {
  browserRefresh: any;
  // tslint:disable-next-line: variable-name
  base_url = `${environment.baseUrl}`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    if (browserRefresh === true) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    } else if (JSON.parse(localStorage.getItem('user')).username === null) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    }
  }

    getMsg() {
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user.username;
        const password = user.password;

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<Message[]>(`${this.base_url}/getAllAyvuTemplateMessages`, {headers});
    }

    getMsgByGP() {
      const user = JSON.parse(localStorage.getItem('user'));
      const username = user.username;
      const password = user.password;

      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.get<Message[]>(`${this.base_url}/getAllTemplateMessagesByGP`, {headers});
  }

    public getMsgOne(id: string) {
        // tslint:disable-next-line: variable-name
        const user_cur = JSON.parse(localStorage.getItem('user'));
        const username = user_cur.username;
        const password = user_cur.password;

        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<Message[]>(`${this.base_url}/getAyvuTemplateMessage/${id}`, {headers});
    }


  public DeleteMsg(msg: Message) {
    // tslint:disable-next-line: variable-name
    const user_cuur = JSON.parse(localStorage.getItem('user'));
    const username = user_cuur.username;
    const password = user_cuur.password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.delete<Message>(`${this.base_url}/deleteAyvuTemplateMessage/${msg.mtsID}`, {headers});
  }

  public CreateMsg(msg: AyuvMessage): Observable<AyuvMessage> {
    // // console.log(userform);
    // tslint:disable-next-line: variable-name
    const user_cuur = JSON.parse(localStorage.getItem('user'));
    const username = user_cuur.username;
    const password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.post<AyuvMessage>(`${this.base_url}/createSingleMessageTemplate`, msg, {headers: headersCreate});
  }

  public UpdateMessage(msg: Message): Observable<Message> {
    // // console.log(userform);
    // tslint:disable-next-line: variable-name
    const user_cuur = JSON.parse(localStorage.getItem('user'));
    const username = user_cuur.username;
    const password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.put<Message>(`${this.base_url}/updateAyvuTemplateMessage/${msg.mtsID}`, msg, {headers: headersCreate});
  }

  sendMsg() {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const password = user.password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get(`${this.base_url}/sendSingleMessageTemplateToSMS`, {headers});
  }
}
