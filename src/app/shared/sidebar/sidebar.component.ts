import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get user(){
    return this.userService.user;
  }
  constructor(public sidebarService: SidebarService,
              private userService: UserService) {
   }

  ngOnInit(): void {
  }

}
