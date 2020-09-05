import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { filter, map } from 'rxjs/operators';
import { Comments } from '../models/comments.model';

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
  styleVal: any;
  likedTggl: boolean;
  favTggl: boolean;
  favVal: boolean;
  rlTggl: boolean;
  cmtTggl:boolean = false;
  username: string;
  blogid: number;
  pageload: boolean = false;
  comments$: Observable<Comments[]>;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.route.params.subscribe((response) => {
      this.blogid = response.id;
      this.blog$ = this.blogService.getBlog(response.id);

    })
    this.comments$ = this.blogService.getComments(this.blogid);
    this.headerTitle = "View Blog";
    this.backdrop = true;
    this.navbarMode = "over";
    this.blogService.getFavBlog(this.username, this.blogid).subscribe((response) => {
      this.favTggl = response;
      this.favVal = this.favTggl;
    });
    this.likedTggl = false;
    this.rlTggl = false;
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

  ngOnDestroy() {
    this.setFav();
  }
  setFav() {
    if (this.favTggl != this.favVal) {
      if (this.favTggl) {
        let formData = {};
        formData['username'] = this.username;
        formData['blog_id'] = this.blogid;
        this.blogService.setFavBlog(formData).subscribe(() => {
          console.log("Blog has been marked in Fav List");
        })
      } else if(!this.favTggl){
        this.blogService.deleteFavBlog(this.username, this.blogid).subscribe(() => {
          console.log("Blog has been removed from your Fav List");
        });
      }
    }
  }

  commentBt(){
    this.cmtTggl = !this.cmtTggl;
  }

  postComment(formvalue: any){
    this.cmtTggl = false;
    let newCmt: Comments = new Comments(formvalue.txt, this.blogid, this.username);
    this.blogService.saveComment(newCmt).subscribe(() =>{
    });
    this.comments$ = this.comments$.pipe(map(cmtList => {
      cmtList.unshift(newCmt);
      return cmtList;
    }));
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
