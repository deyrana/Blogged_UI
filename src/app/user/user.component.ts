import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  userId: string;
  username: string;
  imgUrl: string

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.headerTitle = "Account";
    this.backdrop = true;
    this.navbarMode = "over";
    this.imgUrl = "assets/images/user.png";
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.username = params.username;
    });
  }

}
