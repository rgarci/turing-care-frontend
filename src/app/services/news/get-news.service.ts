import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsList } from 'src/app/interfaces/news/news-list';

@Injectable({
  providedIn: 'root'
})
export class GetNewsService {

  constructor( private http: HttpClient) { 
    this.http = http;
  }

  getNews = () : Promise<NewsList> => {
    let promise = new Promise<NewsList>((resolve, reject) =>{
      this.http.get('http://newsapi.org/v2/top-headlines?q=covid&sortBy=popularity&apiKey=1ed0287504e44960abc9ae7f49c0ba6f')
      .toPromise()
      .then((response) => {
        resolve(response as NewsList)
      }, (error) => {
        reject(error)
      })
    })
    return promise;
  }
}
