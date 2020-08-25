import { Component, OnInit, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../models/blog.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  user: User;
  blogs: Blog[] = [];
  blogs$: Observable<Blog[]>;
  searchText: string;
  pageload: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Blog>;
  var: string;

  constructor(private route: Router, private blogService: BlogService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.headerTitle = "Home";
    this.backdrop = true;
    this.navbarMode = "over";
    this.var = "data:image/jpeg;base64,";
    this.fetchBlogs();

  }

  fetchBlogs() {
    this.blogService.getAllBlogs().subscribe((response) => {
      console.log('Blogs - ' + response.length);
      this.blogs = response;
      this.setDatasource();
      this.pageload = true;
    })
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

  moveToAddScreen() {
    this.route.navigate(['blogs/add']);
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public clearSearch() {
    this.dataSource.filter = "";
    this.searchText = "";
  }

}
