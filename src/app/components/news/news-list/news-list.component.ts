import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  idDoctor : string;
  doctorName: string;
  token: string;

  constructor(private getNewsSvc : GetNewsService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.idDoctor = this.route.snapshot.paramMap.get('idDoctor');
    this.doctorName = this.route.snapshot.paramMap.get('nombre');
    this.token = this.route.snapshot.paramMap.get('token')
    this.getNewsSvc.getNews().then((response) =>{
      this.news = response;
      console.log("resultados %O", response)
    }, (error) => {
      alert("Error: " + error.statusText);
    });
  }

}
