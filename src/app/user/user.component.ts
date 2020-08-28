import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { UserComplete } from './user-complete.model';
import { AuthService } from '../services/auth.service';

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
  blogCount: number;
  favBlogCount: number;
  pageload: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.headerTitle = "Account";
    this.backdrop = true;
    this.navbarMode = "over";
    this.imgUrl = "assets/images/user.png";
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.username = params['username'];
      this.fetchUserCompleteData(this.userId, this.username);
      this.fetchUserBlogCount(this.username);
      this.fetchFavBlogCount(this.username);
    });
  }
  fetchFavBlogCount(username: string) {
    this.userService.getFavBlogCount(username).subscribe((response) => {
      this.favBlogCount = response;
    })
  }
  fetchUserBlogCount(username: string) {
    this.userService.getUserBlogCount(username).subscribe((response) => {
      this.blogCount = response;
    });
  }
  fetchUserCompleteData(userId: string, username: string) {

    if (this.authService.getUser().toLowerCase() === this.username.toLowerCase()) {
      this.userService.getUserCompleteData(userId, username).subscribe((response) => {
        this.userCompleteData = response;
        this.getUserImage();
        this.pageload = true;
      });
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  getUserImage() {
    let imgBin: string = this.userCompleteData.image;
    if (imgBin != null) {
      this.imgUrl = 'data:image/jpeg;base64,' + imgBin;
    }
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

}
