export interface PatientItf {
    "results": Array<
    {
    "gender": string,
    "name": {
    "title": string,
    "first": string,
    "last": string
    },
    "registered": {
        "date": string,
        "age": number
      },
    "phone" : string,
    "id": {
        "name": string,
        "value": string
      }
    }
    >
}
