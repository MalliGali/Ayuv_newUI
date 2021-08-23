import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleMessage, ScheduleMessageSent } from '../models/schMsg.model';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMessageService {
  browserRefresh: any;
  base_url = `${environment.baseUrl}`;
    
  constructor(
    private httpClient:HttpClient,
  ) { }

    getMsg() {
        let userOne = JSON.parse(localStorage.getItem('user'));
        let username = userOne.username;
        let password = userOne.password;
    
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<ScheduleMessage[]>(`${this.base_url}/getAllAyvuScheduledSentMessages`,{headers});
    }

    getMsgByGP() {
      let userOne = JSON.parse(localStorage.getItem('user'));
      let username = userOne.username;
      let password = userOne.password;
  
      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.get<ScheduleMessage[]>(`${this.base_url}/getAllScheduledSentMessagesByGP`,{headers});
  }
    public getMsgOne(id: string) {
        let user_cur = JSON.parse(localStorage.getItem('user'));
        let username = user_cur.username;
        let password = user_cur.password;
    
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<ScheduleMessage[]>(`${this.base_url}/getAyvuScheduledSentMessages/${id}`,{headers});
    }


  public DeleteMsg(msg: ScheduleMessage) {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.delete<ScheduleMessage>(`${this.base_url}/deleteAyvuScheduledSentMessagesById/${msg.schMsgId}`, {headers});
  }

  public CreateMsg(msg: ScheduleMessage): Observable<ScheduleMessage> {
    // // console.log(userform);
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.post<ScheduleMessage>(`${this.base_url}/createAyvuScheduledMessage`, msg, {headers: headersCreate});
  }
  public UpdateMessage(msg: ScheduleMessage): Observable<ScheduleMessage> {
    // // console.log(userform);
    // tslint:disable-next-line: variable-name
    const user_cuur = JSON.parse(localStorage.getItem('user'));
    const username = user_cuur.username;
    const password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.put<ScheduleMessage>(`${this.base_url}/updateScheduleTemplateMessage/${msg.schMsgId}`, msg, {headers: headersCreate});
  }

  sendMsg(msg: ScheduleMessageSent) {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const password = user.password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.post<ScheduleMessageSent[]>(`${this.base_url}/sendScheduledMessage`, msg, {headers});
  }
 
}
