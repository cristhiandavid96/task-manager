import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const storedTasks = await this._storage.get('tasks');
    if (storedTasks) {
      this.tasks = storedTasks;
    }
  }

  getTasks() {
    return this.tasks;
  }

  async addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    await this.saveTasks();
  }

  async removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    await this.saveTasks();
  }

  async toggleTask(id: number) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.saveTasks();
    }
  }

  private async saveTasks() {
    await this._storage?.set('tasks', this.tasks);
  }
}
