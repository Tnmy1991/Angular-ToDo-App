import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../../todo';
import { FormControl, Validators } from '@angular/forms';
import { DataProviderService } from '../../../services/dataProvider/data-provider.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public addTodoHandler: any;
  private item:ToDo;
  public todoItems:Array<ToDo>;

  constructor( private dataProvider: DataProviderService ) { }

  ngOnInit() {
    this.todoItems = this.dataProvider.get();
    this.addTodoHandler = new FormControl( this.addTodoHandler, [
      Validators.required,
      Validators.minLength(2)
    ] );
  }

  addTodo(): void {
    this.item = {
      task: this.addTodoHandler.value,
      completed: false
    }

    this.dataProvider.save(this.item);
    this.addTodoHandler.reset()
  }

  enterToSubmit(event) {
    if(event.keyCode == 13) {
      this.addTodo()
    }
  }

}
