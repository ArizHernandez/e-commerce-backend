export default interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  photoPath?: string;
  initials: string;
  createdAt: Date;
  updatedAt: Date;
}
