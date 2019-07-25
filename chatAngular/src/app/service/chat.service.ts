import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../model/users'
import { Charity } from '../model/charity';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  userSession: string;

  url = 'http://localhost:3400'
  constructor(private http: HttpClient) { }
  initSession() {
    this.userSession = sessionStorage.getItem('user')
  }
  saveUser(UO: Users): Observable<any> {
    alert(JSON.stringify(UO))
    return this.http.post(this.url + '/user/post', JSON.stringify(UO), this.httpOptions)
  }
  getUsers(): Observable<any> {
    return this.http.get(this.url + '/user/get', this.httpOptions)
  }
  loginUser(userid, pass): Observable<any> {
    return this.http.post(this.url + '/user/login', { empId: userid, password: pass }, this.httpOptions)
  }
  getUser(): Observable<any> {
    this.initSession();
    return this.http.get(this.url + '/user/getById/' + this.userSession, this.httpOptions)
  }

  getUserImage(): Observable<any> {
    this.initSession();
    return this.http.get(this.url + '/user/getById/image/' + this.userSession, this.httpOptions)
  }
  postVideo(ch: Users): Observable<any> {
    alert(JSON.stringify(ch))
    return this.http.post(this.url + '/user/imageUpload', JSON.stringify(ch), this.httpOptions)
  }
  sendLinks(data: any): Observable<any> {
    // alert(JSON.stringify(ch))
    return this.http.post(this.url + '/user/links/post', { data: data }, this.httpOptions)
  }
  retriveAdmins(): Observable<any> {
    // alert(JSON.stringify(ch))
    return this.http.get(this.url + '/user/employee/admin', this.httpOptions)
  }
  // 
  requestLinks(reqFrom: any, reqTo: any): Observable<any> {
    return this.http.post(this.url + '/user/emp/request', { 'from': reqFrom, 'to': reqTo }, this.httpOptions)
  }
  // 
  retriveLinks(x: any): Observable<any> {
    return this.http.get(this.url + '/user/emp/request/get/' + x, this.httpOptions)
  }
  receivedLinks(x: any): Observable<any> {
    // alert( "service"+x)
    return this.http.get(this.url + '/user/emp/request/get/links/'+ x, this.httpOptions)
  }
  linkWorkDone(linkid,work): Observable<any> {
    // alert(linkid+work)
    return this.http.put(this.url + '/user/link/workDone', { 'linkId': linkid, 'workDone': work }, this.httpOptions)
  }
  // /user/link/emp/workDone/:id
  linksResult(x: any): Observable<any> {
    return this.http.get(this.url + '/user/link/emp/workDone/' + x, this.httpOptions)
  }
  getUserRole(x:any): Observable<any> {
    return this.http.get(this.url + '/user/roleName/' + x, this.httpOptions)
  }
}
