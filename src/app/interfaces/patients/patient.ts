export interface Patient {
    
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
    },
    "login": {
        "uuid": string,
        "username": string,
        "password": string,
        "salt": string,
        "md5": string,
        "sha1": string,
        "sha256": string
    }
}
