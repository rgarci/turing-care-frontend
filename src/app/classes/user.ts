export class User {
  token: string;
  refreshToken: string;
  role: string;
  // tslint:disable-next-line:variable-name
  user_id : number;
  username : string;
  doctor: {
    doctor_id : number,
    nombre : string,
    apellido_paterno : string,
    apellido_materno : string
  };
}
