import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: number;
  username: string;
  password: string;
  loginFailed: string;
  constructor(private router: Router, private US: ChatService) { }

  ngOnInit() {
  }

  login() {
    this.US.loginUser(this.id, this.password).subscribe((data) => {
      console.log(data[0].emp_role);
      sessionStorage.setItem("user", data[0].emp_id)
      if (data != '') {
        if (data[0].emp_role == 'admin') {
          this.router.navigate(['chat/admin']);
        } else {
          this.router.navigate(['chat/chat']);
        }
      }
    })
  }
}
