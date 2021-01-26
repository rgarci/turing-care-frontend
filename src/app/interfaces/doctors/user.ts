export interface User{
    "usuarioId": number,
    "usuario": string,
    "password": string,
    "token": string,
    "role": string,
    "tiempoIniToken": string,
    "intentoLogin": string,
    "messageMedico": {
      "medicoId": number,
      "nombre": string,
      "apellidoPaterno": string,
      "apellidoMaterno": string,
      "curp": string,
      "especialidad": string,
      "status": string,
      "email": string,
      "telefono": string
    }
  }