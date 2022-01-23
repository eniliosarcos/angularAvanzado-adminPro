import { environment } from "src/environments/environment";


const base_url = environment.base_URL

export class User{
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public role?: string,
    public img?: string,
    public userId?: string
  ){}

  get imgUrl(){
    if(!this.img){
      return `${base_url}/subir/usuarios/no-img`
    }
    //localhost:8080/api/subir/usuarios/no-img
    if(this.img.includes('https')){
      return this.img;
    }

    if(this.img){
      return `${base_url}/subir/usuarios/${this.img}`;
    }

    return `${base_url}/subir/usuarios/no-img`;
  }
}
