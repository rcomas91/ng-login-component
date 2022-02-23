import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-camisa',
  templateUrl: './adicionar-camisa.component.html',
  styleUrls: ['./adicionar-camisa.component.css']
})
export class AdicionarCamisaComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  constructor() { }

  ngOnInit(): void {
  }

}