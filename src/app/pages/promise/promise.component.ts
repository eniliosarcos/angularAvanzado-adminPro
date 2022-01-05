import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then(resp => console.log(resp));

    // const promise = new Promise((resolve, reject)=>{

    //   if(false){

    //     resolve('hola')
    //   }else{
    //     reject('Algo salio mal');
    //   }
    // });

    // promise.then((mensaje)=>{
    //   console.log(mensaje);
    // }).catch((err)=>console.log(err))

    // console.log('fin init')
  }

  getUsers(){
    const promise = new Promise(resolve =>{

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    });

    return promise;
  }

}
