import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  nombre: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,public dialogRef: MatDialogRef<QuestionDialogComponent>) {
    this.nombre = data;
}

  ngOnInit(): void {
  }

  eliminar(b: boolean) {
    this.dialogRef.close(b);
  }
}
