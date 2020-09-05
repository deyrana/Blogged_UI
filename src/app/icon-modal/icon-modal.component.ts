import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-icon-modal',
  templateUrl: './icon-modal.component.html',
  styleUrls: ['./icon-modal.component.css']
})
export class IconModalComponent implements OnInit {

  icons: any[];

  constructor(public dialogRef: MatDialogRef<IconModalComponent>,
    public userService: UserService) { }

  onNoClick() {
    this.dialogRef.close("Icon Modal");
  }

  closeDailog(img: string){
    this.dialogRef.close(img);
  }

  ngOnInit(): void {
    this.userService.fetchAllIcons().subscribe((response) => {
      this.icons = response;
    });
  }

}
