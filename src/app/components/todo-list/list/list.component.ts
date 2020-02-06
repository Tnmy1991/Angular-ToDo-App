import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from '../../../todo';
import { DataProviderService } from '../../../services/dataProvider/data-provider.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 1, transition: 'opacity .5s', transform: 'translateX(-60%)' }),
        animate('0.5s 500ms ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ opacity: 0, transition: 'opacity .2s', transform: 'translateX(60%)' }))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {

  @Input() items:Array<ToDo>;
  public editMode:boolean = false;
  public editTab:number = null;

  constructor(
    private dataProvider:DataProviderService
  ) { }

  ngOnInit() {}

  editItem(ref): void {
    this.editMode = true;
    this.editTab = ref;
  }

  setValue(elem, i): void {
    let tempList:Array<ToDo> = [];

    this.items.forEach(function(element, index) {
      if(i === index) {
        tempList.push(elem);
      } else {
        tempList.push(element);
      }
    });

    this.editMode = false;
    this.editTab = null;
    this.items = tempList;
    this.dataProvider.update(this.items);
  }

  toggleItem(ref): void {
    let tempList:Array<ToDo> = [];

    this.items.forEach(function(element, index) {
      if(ref === index) {
        tempList.push({
          task: element.task,
          completed: !element.completed
        });
      } else {
        tempList.push(element);
      }
    });

    this.items = tempList;
    this.dataProvider.update(this.items);
  }

  removeItem(ref): void {
    let tempList:Array<ToDo> = [];

    this.items.forEach(function(element, index) {
      if(ref != index) {
        tempList.push(element);
      }
    });

    this.items = tempList;
    this.dataProvider.update(this.items);
  }

}
