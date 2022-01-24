import { Hospital } from "./hospital.model";

interface _MedicUser{
  _id:string;
  name:string;
  img:string
}

export class Medic {
  constructor(
    public name: string,
    public medicID?: string,
    public img?: any,
    public user?: _MedicUser,
    public hospital?: Hospital,
  ){}
}
