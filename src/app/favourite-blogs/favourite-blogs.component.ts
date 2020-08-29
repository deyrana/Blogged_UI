import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-blogs',
  templateUrl: './favourite-blogs.component.html',
  styleUrls: ['./favourite-blogs.component.css']
})
export class FavouriteBlogsComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  username: string;
  searchText: string;
  blogs: Blog[] = [];
  blogs$: Observable<Blog[]>;
  pageLoad: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Blog>;

  constructor(private userService: UserService, private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef, private route: Router) { }

  ngOnInit(): void {
    this.headerTitle = "Favourite Blogs";
    this.backdrop = true;
    this.navbarMode = "over";
    this.username = this.authService.getUser();
    this.fetchFavBlogs();
  }
  fetchFavBlogs() {
    this.userService.getFavBlogs(this.username).subscribe((response) => {
      this.blogs = response;
      this.pageLoad = true;
      this.setDatasource();
    });
  }

  setDatasource() {
    this.dataSource = new MatTableDataSource<Blog>(this.blogs);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.blogs$ = this.dataSource.connect();
  }

  truncateContent(content: string) {
    if (content.length > 540) {
      content = content.substring(0, 540) + '...';
    }
    return content;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.blogs = this.dataSource.data;
  }

  public clearSearch() {
    this.dataSource.filter = "";
    this.searchText = "";
  }

}
