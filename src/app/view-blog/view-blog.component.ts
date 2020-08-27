import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  blog$: Observable<Blog>;
  var: string;
  styleVal: any;
  likedTggl: boolean;
  favTggl: boolean;
  rlTggl: boolean;
  username: string;
  blogid: number;
  pageload: boolean = false;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((response) => {
      this.blogid = response.id;
      this.blog$ = this.blogService.getBlog(response.id);
    })
    this.headerTitle = "View Blog";
    this.backdrop = true;
    this.navbarMode = "over";
    this.var = "data:image/jpeg;base64,";
    this.likedTggl = false;
    this.favTggl = false;
    this.rlTggl = false;
    this.username = this.authService.getUser();
    console.log(this.username);
  }

  LikedBtn() {
    this.likedTggl = !this.likedTggl;
  }

  readListBtn() {
    this.rlTggl = !this.rlTggl;
  }

  favBtn() {
    this.favTggl = !this.favTggl;
  }

  delete() {
    console.log("Deleted...");
    this.blogService.deleteBlog(this.blogid).subscribe((response: any) => {
      console.log(response);
      if (response) {
        let title: string = "Message";
        let content: string = "Blog has been deleted successfully!";
        let urlprev: string = "/home";
        let primeBtn: string = null;
        let secBtn: string = "OK";
        this.openDialog(title, content, urlprev, primeBtn, secBtn);
      }
    })
  }

  openDialog(title: string, content: string, url: string, primeBtn: string, secBtn: string): void {
    let obj = {};
    obj['title'] = title;
    obj['content'] = content;
    obj['primeBtn'] = primeBtn;
    if (url != null) {
      obj['url'] = url;
    }
    if (secBtn != null) {
      obj['secBtn'] = secBtn;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
