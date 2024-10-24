import { Component } from '@angular/core';
import { TaskService, Task } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: Task[] = [];
  taskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
  }

 async addTask() {
    if (this.taskTitle.trim()) {
    await  this.taskService.addTask(this.taskTitle);
      this.taskTitle = '';
    }
  }

 async removeTask(id: number) {
   await this.taskService.removeTask(id);
  }

 async toggleTask(id: number) {
    await this.taskService.toggleTask(id);
  }
}
