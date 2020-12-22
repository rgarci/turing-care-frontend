import { NewItf } from "./new";

export interface NewsList {
    "status": string,
    "totalResults": number,
    "articles": Array<NewItf>
}
