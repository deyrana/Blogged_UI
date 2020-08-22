import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

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

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.route.params.subscribe((response) => {
      this.blog$ = this.blogService.getBlog(response.id);
      this.blog$.subscribe((response) => {
        console.log(response);
      })
    })
    this.headerTitle = "View Blog";
    this.backdrop = true;
    this.navbarMode = "over";
    this.var = "data:image/jpeg;base64,";
  }

  LikedBtn(e) {
    if (e.target.value != undefined) {
      const classList = e.target.classList;
      const classes = e.target.className;
      classes.includes('blue') ? classList.remove('blue') : classList.add('blue');
    }
  }

  readListBtn(e) {
    if (e.target.value != undefined) {
      const classList = e.target.classList;
      const classes = e.target.className;
      classes.includes('yellow') ? classList.remove('yellow') : classList.add('yellow');
    }
  }

  favBtn(e) {
    if (e.target.value != undefined) {
      const classList = e.target.classList;
      const classes = e.target.className;
      classes.includes('red') ? classList.remove('red') : classList.add('red');
    }
  }

}
