import {Doctor} from "./doctor";

export interface DoctorItf {
  "nhits": number,
  "parameters": {
    "rows": number,
    "format": string
  },
  "records": Array <Doctor>;
}
