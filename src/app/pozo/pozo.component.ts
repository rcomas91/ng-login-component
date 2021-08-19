import { Component, OnInit } from '@angular/core';
import { Pozo } from './pozo';
import { PozoService } from './pozo.service';

@Component({
  selector: 'app-pozo',
  templateUrl: './pozo.component.html',
  styleUrls: ['./pozo.component.css']
})
export class PozoComponent implements OnInit {
  pozos: Pozo[];

  constructor(private pozoService:PozoService) { }


  ngOnInit(){
  this.pozoService.getPozos().subscribe(
    (pozos)=>{this.pozos=pozos, console.log(this.pozos)}
  
  );
  }

  delete(pozo:Pozo):void{
    this.pozoService.delete(pozo.PozoId).subscribe(
      response=>{
        this.pozos=this.pozos.filter(nec=>nec!==pozo)
      }
    )
  }
  }


