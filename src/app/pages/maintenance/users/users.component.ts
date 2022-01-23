import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {

  totalUsers:number;
  users:User[] = [];
  usersTemp:User[] = [];
  from:number = 0;
  loading:boolean = true;

  subscriptions: Subscription[] = [];

  get myUserId(){
    return this.userService.user.userId;
  }

  constructor(private userService:UserService,
              private searchService:SearchService,
              private modalimgService:ModalImageService) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  ngOnInit(): void {
    this.getUsers();

    this.subscriptions.push(  this.modalimgService.newImg.pipe(delay(500)).subscribe(img => this.getUsers())   );
  }

  getUsers(){
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({totalUsers,users}) => {
      this.totalUsers = totalUsers;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    })
  }

  changePaginate(value:number){
    this.from += value;

    if(this.from < 0){
      this.from = 0;
    } else if(this.from > this.totalUsers){
      this.from -= value;
    }

    this.getUsers();
  }

  search(find:string){
    if(find.length === 0){
      this.users = this.usersTemp;
      return;
    }
    this.searchService.search('usuarios',find).subscribe(resp => {
      this.users = resp
    })
  }

  deleteUser(user: User){
    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.userId).subscribe(resp =>{
          Swal.fire('Usuario borrado', `${user.name} fue eliminado exitosamente`, 'success');
          this.getUsers();
        });

      }
    })
  }

  changeRole(user:User){
    this.userService.updateRole(user).subscribe();
  }

  showModal(user){
    this.modalimgService.openModal('usuarios',user.userId,user.img);
  }

}
