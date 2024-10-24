import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from 'src/app/services/task.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks$: Observable<Task[]> = of([]); // Solución 2: Inicializar con un Observable vacío
  taskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
  }

  async addTask() {
    if (this.taskTitle.trim()) {
      await this.taskService.addTask(this.taskTitle);
      this.taskTitle = '';
    }
  }

  async removeTask(id: number) {
    await this.taskService.removeTask(id);
  }

  async toggleTaskCompletion(id: number) {
    await this.taskService.toggleTaskCompletion(id);
  }
}
