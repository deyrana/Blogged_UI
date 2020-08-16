import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import {BlogService} from 'src/app/services/blog.service';
import { Blog } from '../models/blog.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  imgUrl: string;
  username: string;
  user: User;
  blogs: Blog[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService, private route: Router,
    private userService: UserService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.headerTitle = "Home";
    this.backdrop = true;
    this.navbarMode = "over";
    this.imgUrl = "assets/images/user.png";
    this.username = localStorage.getItem('token');
    this.fetchUser();
    this.fetchBlogs();
    
  }

  fetchBlogs() {
   this.blogService.getAllBlogs() .subscribe((response) =>{
     console.log('Blogs - '+response.length);
     this.blogs = response;
   })
  }
  fetchUser() {
    this.userService.getUserData(this.username).subscribe((response) => {
      console.log('User is - ' + response.name);
      let imgBin: string = response.image;
      if (imgBin != null) {
        this.imgUrl = 'data:image/jpeg;base64,' + response.image;
        this.setUpUserDate(response);
      }
    })
  }
  setUpUserDate(response: any) {
    this.user = new User(response.name,  this.username, null, response.email, response.dateOfBirth,response.genres);
    
  }

  navigateTo() {
    console.log('Button clicked');
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

  truncateContent(content: string) {
    if (content.length > 540) {
      content = content.substring(0, 540) + '...';
    }
    return content;
  }

  moveToAddScreen(){
    this.route.navigate(['blogs/add']);
  }

}
