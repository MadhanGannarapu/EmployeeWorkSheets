import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  userStudentList: any;
  column = [];
  date = new Date();
  userid: any
  receiver: any;
  linksResults: any;
  constructor(private cs: ChatService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userid = sessionStorage.getItem('user')
    this.receiver = this.route.snapshot.params.id
  }
 
  Generate(g) {
    this.userStudentList = []
    let data = g.value
    for (let i = 0; i < data; i++) {
      this.userStudentList.push(data)
    }
  }

  columnName(x, i) {
    let z = this.date.getMilliseconds()
    this.column.push({ 'col': x.value, 'index': this.userid + z + i, "senderId": this.userid, "receiverId": this.receiver });
    this.column = this.column.reverse().filter((li, idx, self) => self.map(itm => itm.index).indexOf(li.index) === idx)
  }

  Links() {
    this.cs.sendLinks(this.column).subscribe((data) => {
    })
  }
}
