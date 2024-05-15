import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() data:any[]=[]
  @Input() title:string='';
  @Input() value:any = 'none';
  @Output() getSelected=new EventEmitter<string>();

  chageSelected(e:any){
    this.getSelected.emit(e);
  }
}
