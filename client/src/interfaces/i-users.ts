export interface IUsers {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}
