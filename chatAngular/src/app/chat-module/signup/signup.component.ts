import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../../model/users';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userObj: Users;
  uploadedFiles: any[] = [];
  charity: any;
  video: any;
  constructor(private router: Router, private US: ChatService) {
    this.userObj = new Users();
  }

  ngOnInit() {
  }
  myUploader(event: any) {
    console.log(event.target.files[0]);
    var file = event.target.files[0];
    this.uploadedFiles.push(file);
  }

  register() {
    console.log(this.userObj.empId);
    this.US.saveUser(this.userObj).subscribe(() => {
      alert("data posted sucessfully");

      console.log(this.uploadedFiles);

      // for (let i = 0; i < this.uploadedFiles.length; i++) {
      let reader: FileReader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.video = event.target.result;
        this.userObj.id = this.userObj.empId;
        this.userObj.video = this.video;
        this.userObj.video = this.userObj.video.replace("data:video/mp4;base64,", "");
        this.userObj.video = this.userObj.video.replace("data:image/gif;base64,", "");
        this.userObj.video = this.userObj.video.replace("data:image/jpeg;base64,", "");
        this.userObj.video = this.userObj.video.replace("data:image/jpg;base64,", "");
        this.userObj.video = this.userObj.video.replace("data:image/png;base64,", "");
        this.userObj.extension = this.uploadedFiles[0].name
        console.log(this.userObj.extension);


        // if (i == 0) {
        //   this.charity.extension = "default.jpg"
        // } else {
        //   this.charity.extension = this.uploadedFiles[i].name
        // }
        this.US.postVideo(this.userObj).subscribe((datas) => {
          // if (datas) {
          //   this.router.navigate(['/charity/ViewCharity'])
          // }
        })
      });
      reader.readAsDataURL(this.uploadedFiles[0]);
      // }

    })
  }
}
