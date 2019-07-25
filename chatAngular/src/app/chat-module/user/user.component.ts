import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { Charity } from 'src/app/model/charity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  video: any;
  uploadedFiles: any[] = [];
  charity: any;
  adminsList: any;
  reqUsers: any;
  LinksData: any;
  linksResults: any;
  userRole: any;

  constructor(private cs: ChatService, private router: Router) {
    this.charity = new Charity();
  }


  ngOnInit() {
    let x = sessionStorage.getItem('user')
    this.getUserById();

    this.requestedusers(x);
    this.receivedLink(x);
    this.linksRes(x);

    this.cs.getUser().subscribe((data) => {
      this.userRole = data[0].emp_role;
      console.log(this.userRole);
      
      // this.cs.getUserImage().subscribe((imgData) => {
      //   this.user[0]['image'] = imgData[0]
      // })
    })
  }

  getUserById() {
    this.cs.getUser().subscribe((data) => {
      this.user = data
      this.cs.getUserImage().subscribe((imgData) => {
        this.user[0]['image'] = imgData[0]
      })
    })
  }

  myUploader(event: any) {
    var file = event.target.files[0];
    this.uploadedFiles.push(file);
  }

  fileUpload() {
    console.log(this.uploadedFiles);
    let reader: FileReader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.video = event.target.result;
      this.charity.id = 1;
      this.charity.video = this.video;
      this.charity.video = this.charity.video.replace("data:video/mp4;base64,", "");
      this.charity.video = this.charity.video.replace("data:image/gif;base64,", "");
      this.charity.video = this.charity.video.replace("data:image/jpeg;base64,", "");
      this.charity.video = this.charity.video.replace("data:image/jpg;base64,", "");
      this.charity.video = this.charity.video.replace("data:image/png;base64,", "");
      this.charity.extension = this.uploadedFiles[0].name
      this.cs.postVideo(this.charity).subscribe((datas) => {
      })
    });
    reader.readAsDataURL(this.uploadedFiles[0]);
  }
  getAdmins() {
    this.cs.retriveAdmins().subscribe((data) => {
      this.adminsList = data
    })
  }

  request(emp_empid) {
    let x = sessionStorage.getItem('user')
    this.cs.requestLinks(x, emp_empid).subscribe((data) => {
    })
  }

  requestedusers(x: any) {
    this.cs.retriveLinks(x).subscribe((data) => {
      this.reqUsers = data
    })
  }

  sendLinks(id: any) {
    this.router.navigate(['chat/links']);
  }

  receivedLink(x) {
    this.cs.receivedLinks(x).subscribe((data) => {
      this.LinksData = data
      console.log(this.LinksData);


    })
  }

  openInNewWindow(text: any) {
    window.open(text)
  }

  workDone(linkId, res) {
    this.cs.linkWorkDone(linkId, res).subscribe((data) => {
      alert("work submitted sucessfully")
    })
  }

  linksRes(id) {
    this.cs.linksResult(id).subscribe((data) => {
      this.linksResults = data
    })
  }
}
