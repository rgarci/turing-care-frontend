import { Component, OnInit } from '@angular/core';
import { NewItf } from 'src/app/interfaces/news/new';
import { NewsList } from 'src/app/interfaces/news/news-list';
import { GetNewsService } from 'src/app/services/news/get-news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news : NewsList;

  constructor(private getNewsSvc : GetNewsService) { }

  ngOnInit(): void {
    this.getNewsSvc.getNews().then((response) =>{
      this.news = response;
      console.log("resultados %O", response)
    }, (error) => {
      alert("Error: " + error.statusText);
    });
  }

}
