import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  messageArray = []
  allUsers: any;
  route: string;
  user: any;
  constructor(private cs: ChatService, private router: Router) {
    this.route = router.url;
    console.log(this.route);

  }

  ngOnInit() {
    this.getUsers();
    var data = sessionStorage.getItem('user')
    console.log(data);
    this.getUserById();

  }

  getUsers() {
    this.cs.getUsers().subscribe((data) => {
      this.allUsers = data;
    })
  }

  getUserById() {
    this.cs.getUser().subscribe((data) => {
      this.user = data
      // console.log(this.user);
      this.cs.getUserImage().subscribe((imgData) => {
        // this.user.push(imgData)
        console.log(imgData[0]);

        this.user[0]['image'] = imgData[0]
        console.log(this.user);

      })
    })
    // console.log(this.user);
  }
  profile() {
    this.router.navigate(['chat/chat']);
  }
}
