import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addReduce',
  templateUrl: './addReduce.component.html',
  styleUrls: ['./addReduce.component.scss']
})
export class AddReduceComponent implements OnInit {

  counter:number = 0;

  constructor() { }

  ngOnInit() {
  }

  decrese(){
    console.log('hey decrese');
    if(this.counter - 1 > 0){
      this.counter--;
    }
    
  }

  increse(){
    if(this.counter + 1 < 100){
      this.counter++;
    }
    
  }

}
