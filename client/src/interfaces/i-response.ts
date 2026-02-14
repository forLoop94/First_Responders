import { ICurrentUser } from "./i-users";

export interface IResponseFormat<IDataObject> {
  success: boolean;
  message: string;
  data: IDataObject[];
}

export interface IUserResponseFormat {
  success: boolean;
  message: string;
  data: ICurrentUser;
}

export interface IPaginatedResponseFormat<IPaginated> {
  success: boolean;
  message: string;
  data: IPaginated;
}

export interface IPaginated<IDataObject> {
  totalItems: number;
  numOfPages: number;
  currentPage: number;
  items: IDataObject[];
}
