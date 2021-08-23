import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserLogin } from 'src/app/models/UserLogin';
import { environment } from '../models/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'username';
  public token: any = localStorage.getItem(`users`)
  public username: any;
  public password: any;
  webLogin: boolean = true;

  constructor(
    private http: HttpClient) {

  }
  ngOnInit(): void {
    this.username  = this.token.username;
    this.password  = this.token.password;
  }

  // tslint:disable-next-line: ban-types
  authenticationService(username: String, password: String, userLogin: UserLogin) {
    // // //// console.log(username, password, userLogin);
    return this.http.post(`${environment.baseUrl}/user/login`, userLogin,
      { headers: { authorization: this.createBasicAuthToken(username, password)} }).pipe(map((res: any) => {
        // //// console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('webLogin', `${this.webLogin}`);
        this.username = username;
        this.password = password;
        return this.registerSuccessfulLogin(username, password);
      }));
  }


  // tslint:disable-next-line: ban-types
  createBasicAuthToken(username: String, password: String) {
    // //// console.log('Basic ' + btoa(username + ":" + password));
    return 'Basic ' + window.btoa(username + ':' + password);
  }
  registerSuccessfulLogin(username, password) {
    localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }
  isUserLoggedIn() {
    const user = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }
}
