import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { BlogService } from '../services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  AddBlogForm: FormGroup;
  headerTitle: string;
  backdrop: boolean;
  navbarMode: string;
  username: string;

  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  genre = [
    'Adventure', 'Horror', 'Thriller', 'Mystery', 'Gore'
  ];
  selectedGenre = [
  ];
  filteredOptions: Observable<string[]>;


  constructor(private formBuilder: FormBuilder, private route: Router,
    private blogService: BlogService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.headerTitle = "Add Blog";
    this.backdrop = true;
    this.navbarMode = "over";
    this.username = localStorage.getItem('token');

    this.AddBlogForm = this.formBuilder.group({
      header: [null, Validators.required],
      genres: [null],
      content: [null, Validators.required],
    });

    this.filteredOptions = this.AddBlogForm.get('genres').valueChanges.pipe(
      startWith(null),
      map((gnr: string | null) => gnr ? this._filter(gnr) : this.genre.slice()));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.genre.filter(gnr => gnr.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (this.genre.indexOf(value.toLowerCase().trim()) === -1) {
      console.log(value.toLowerCase().trim())
      return;
    }

    if ((value || '').trim()) {
      this.selectedGenre.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(genre: any): void {
    const index = this.selectedGenre.indexOf(genre);

    if (index >= 0) {
      this.selectedGenre.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedGenre.push(event.option.value);
    this.AddBlogForm.get('genres').setValue(null);
    this.genreInput.nativeElement.value = '';
  }

  navigateTo() {
    console.log('Button clicked');
  }

  submit() {
    if (this.AddBlogForm.valid) {
      this.AddBlogForm.get('genres').setValue(this.selectedGenre);
      const formData = this.setUpFormData();
      this.blogService.saveBlog(formData).subscribe((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          console.log("Success");
          let title: string = "Success";
          let content: string = "Blog has been posted successfully!";
          let url: string = null;
          let primeBtn: string = null;
          let secBtn: string = "Ok";
          this.openDialog(title, content, url, primeBtn, secBtn);
          this.AddBlogForm.reset();
        } else {
          console.log("Failure");
        }
      })
    }
  }
  setUpFormData() {
    let formData = {};
    formData['header'] = this.AddBlogForm.get('header').value;
    formData['content'] = this.AddBlogForm.get('content').value;
    formData['genres'] = this.getValuesAsPipes(this.AddBlogForm.get('genres').value);
    formData['createdBy'] = this.username;
    return formData
  }

  getValuesAsPipes(list: any): any {
    let str: string = '';
    for (let value of list) {
      if (str.length > 0) {
        str += ',';
      }
      str += value;
    }
    return str;
  }

  cancel(): void {
    if (this.AddBlogForm.touched && this.AddBlogForm.dirty) {
      let title: string = "Exit";
      let content: string = "Are you sure want to Exit? Your changes will not be saved";
      let url: string = "/home";
      let primeBtn: string = "No";
      let secBtn: string = "Yes";
      this.openDialog(title, content, url, primeBtn, secBtn);
    } else {
      this.route.navigate(['/home']);
    }
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
