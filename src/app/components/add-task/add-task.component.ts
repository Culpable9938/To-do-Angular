import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Task} from '../../Task';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/sevices/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter;

  text:string;
  day: string;
  reminder: boolean;

  errormsg:string = "";

  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
   }

  ngOnInit(): void {
  }

  //Check if everything is filled

  onSubmit()
  {
    if(!this.text)
    {
      this.errormsg = "Please add text!";
      return;
    }
    if(!this.day)
    {
      this.errormsg = "Please set date!";
      return;
    }

    //Creating a new task object

    const newTask: Task = 
    {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    //Emiting the new task

    this.onAddTask.emit(newTask)

    //Null input values 

    this.text = '';
    this.day = '';
    this.reminder = false;
  }

}
