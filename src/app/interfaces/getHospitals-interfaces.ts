import { Hospital } from "../models/hospital.model";

export interface GetHospitals{
  totalHospitals: number;
  hospitals: Hospital[];
}
