import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { UserComplete } from './user-complete.model';

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
  userCompleteData: UserComplete;
  pageload: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.headerTitle = "Account";
    this.backdrop = true;
    this.navbarMode = "over";
    this.imgUrl = "assets/images/user.png";
    this.route.queryParams.subscribe(params => {
      this.userId =params['userId'];
      this.username = params['username'];
      this.fetchUserCompleteData(this.userId,this.username);
    });
  }
  fetchUserCompleteData(userId: string, username: string) {
    this.userService.getUserCompleteData(userId, username).subscribe((response) => {
      this.userCompleteData = response;
      this.getUserImage();
      this.pageload = true;
    });
  }

  getUserImage(){
    let imgBin: string = this.userCompleteData.image;
      if (imgBin != null) {
        this.imgUrl = 'data:image/jpeg;base64,' + imgBin;
      }
  }

  navigateHome(){
    this.router.navigate(['/home']);
  }

}
