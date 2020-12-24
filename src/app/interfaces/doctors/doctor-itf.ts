export interface DoctorItf {
  "nhits": number,
  "parameters": {
    "rows": number,
    "format": string
  },
  "records": Array <
    {
      "recordid" : string,
      "fields": {
        "titular": string,
        "nombre": string,
        "direccion": string,
        "nombreDoctor": string,
        "curp" : string
      }
    }
    >;
}
