import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Password, RegisterUser, UserAyuv, UserAyuvCreate } from '../models/user';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  browserRefresh: any;
    
  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) { }

    getAyuvUser() {
        let user = JSON.parse(localStorage.getItem('user'));
        let username = user.username;
        let password = user.password;
        console.log(username, password)
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<UserAyuv[]>(`${environment.baseUrl}/getAyvuAllUsers`,{headers});
    }

    public getUserOne(id: string) {
        let user_cur = JSON.parse(localStorage.getItem('user'));
        let username = user_cur.username;
        let password = user_cur.password;
    
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get<UserAyuv[]>(`${environment.baseUrl}/getAyvuUser/${id}`,{headers});
    }


  public deleteAyuvUser(user: UserAyuv) {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.delete<UserAyuv>(`${environment.baseUrl}/deleteAyvuUser/${user.ayvuId}`, {headers});
  }

  public createAyuvUser(userform: UserAyuvCreate): Observable<UserAyuvCreate> {
    // // console.log(userform);
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpClient.post<UserAyuvCreate>(`${environment.baseUrl}/createAyvuUser`, userform, {headers: headersCreate});
  }

  public updateAyuvUser(user: UserAyuv): Observable<UserAyuv> {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(headersCreate);
    return this.httpClient.put<UserAyuv>(`${environment.baseUrl}/updateAyvuUser/${user.ayvuId}`, user, {headers: headersCreate});
  }
  getGP(): Observable<any> {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(headersCreate);
    return this.httpClient.get<any>(`${environment.baseUrl}/getAllGps`, {headers: headersCreate});
  }

  getPendingUsers() {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(headersCreate);
    return this.httpClient.get<any>(`${environment.baseUrl}/getPendingRegisterUsersByGP`, {headers: headersCreate});
  }

  getUsersByGp() {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(headersCreate);
    return this.httpClient.get<any>(`${environment.baseUrl}/getAllUsersByGP`, {headers: headersCreate});
  }

  approveUser(user: UserAyuv): Observable<UserAyuv> {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(headersCreate);
    return this.httpClient.post<UserAyuv>(`${environment.baseUrl}/updateUserRegisterStatusByGP`, user, {headers: headersCreate});
  }

  rejectUser(user: UserAyuv): Observable<UserAyuv> {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(headersCreate);
    return this.httpClient.post<UserAyuv>(`${environment.baseUrl}/updateUserRegisterStatusByGP`, user, {headers: headersCreate});
  }

  handleError(error: HttpErrorResponse){
      console.log(error.status);
      if(error.status === 201) {
        // this._toastMsg.openSnackBar('New User Created Successfully!');
        this.router.navigate(['users']);
      }
    return throwError(error);
  }
 
  public registerAyuvUser(userform: RegisterUser): Observable<RegisterUser> {
    // // console.log(userform);
    // let user_cuur = JSON.parse(localStorage.getItem('user'));
    // let username = user_cuur.username;
    // let password = user_cuur.password;

    // const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpClient.post<RegisterUser>(`${environment.baseUrl}/registerUser`, userform);
  }
  changePassword(userform) {
    // console.log(userform);
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpClient.post<Password>(`${environment.baseUrl}/updatePassword`, userform);
  }

}
