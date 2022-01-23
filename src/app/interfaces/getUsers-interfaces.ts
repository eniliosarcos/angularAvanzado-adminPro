import { User } from "../models/user.model";

export interface GetUsers{
  totalUsers: number;
  users: User[];
}
