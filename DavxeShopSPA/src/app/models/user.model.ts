export interface User {
    userId: number,
    dni: string,
    name: string,
    email: string,
    birthDate: string,
    city: string,
    rolId: number,
    imageBase64: string,
}
export interface UpdateProfile {
  userId: number;
  name: string;
  email: string;
  imageBase64: string;
  birthDate: string;
  dni: string;
  city: string;
  password?: string;
}