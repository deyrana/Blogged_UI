import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavcontent',
  templateUrl: './sidenavcontent.component.html',
  styleUrls: ['./sidenavcontent.component.css']
})
export class SidenavcontentComponent implements OnInit {

  imgUrl: string;
  username: string;
  userid: number;
  constructor(private userService: UserService, private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.imgUrl = "assets/images/user.png";
    this.username = localStorage.getItem('token');
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUserData(this.username).subscribe((response) => {
      console.log('User is - ' + response.name);
      let imgBin: string = response.image;
      this.userid = response.userId;
      if (imgBin != null) {
        this.imgUrl = 'data:image/jpeg;base64,' + response.image;
      }
    })
  }


  navigateToAccount() {
    this.route.navigate(['user/detail'], { queryParams: { userId: this.userid, username: this.username } });
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

}
