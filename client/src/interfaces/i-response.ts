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
