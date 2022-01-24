import { Medic } from "../models/medic.model";

export interface GetMedics{
  totalMedics: number;
  medics: Medic[];
}
