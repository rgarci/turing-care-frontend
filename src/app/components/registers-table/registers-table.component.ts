import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  fecha: Date;
  asunto: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, fecha:  new Date(), asunto: "consulta general" }, 
  {position: 2, fecha:  new Date(), asunto: "consulta general" }, 
  {position: 3, fecha:  new Date(), asunto: "consulta general" },
  {position: 4, fecha:  new Date(), asunto: "consulta general" },
  {position: 5, fecha:  new Date(), asunto: "consulta general" },
  {position: 6, fecha:  new Date(), asunto: "consulta general" },
  {position: 7, fecha:  new Date(), asunto: "consulta general" },
  {position: 8, fecha:  new Date(), asunto: "consulta general" }, 
  {position: 9, fecha:  new Date(), asunto: "consulta general" }, 
  {position: 10, fecha:  new Date(), asunto: "consulta general" }
];
@Component({
  selector: 'app-registers-table',
  templateUrl: './registers-table.component.html',
  styleUrls: ['./registers-table.component.css']
})
export class RegistersTableComponent {
  displayedColumns: string[] = ['position', 'asunto', 'fecha', 'acciones'];
  dataSource = ELEMENT_DATA;
 
}
