import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get user(){
    return this.userService.user;
  }

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  search(term:string){

    if(term.length === 0){
      return ;
    }
    this.router.navigateByUrl(`/dashboard/search/${term}`);

  }

}
