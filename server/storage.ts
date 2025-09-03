import { type Task, type InsertTask } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map();
    // Add some initial sample tasks for demo
    this.seedTasks();
  }

  private seedTasks() {
    const sampleTasks: Task[] = [
      {
        id: "1",
        title: "Review quarterly financial reports",
        description: "Analyze Q4 financial performance and prepare summary",
        priority: "high",
        completed: false,
        dueDate: new Date("2024-12-15"),
        createdAt: new Date("2024-12-10"),
      },
      {
        id: "2", 
        title: "Update project documentation",
        description: "Update README and API documentation",
        priority: "medium",
        completed: true,
        dueDate: new Date("2024-12-12"),
        createdAt: new Date("2024-12-08"),
      },
      {
        id: "3",
        title: "Organize team building event",
        description: "Plan and coordinate team building activities",
        priority: "low",
        completed: false,
        dueDate: new Date("2024-12-20"),
        createdAt: new Date("2024-12-09"),
      },
      {
        id: "4",
        title: "Prepare client presentation slides",
        description: "Create presentation for client meeting",
        priority: "high", 
        completed: false,
        dueDate: new Date(),
        createdAt: new Date("2024-12-13"),
      },
      {
        id: "5",
        title: "Review code submissions from team",
        description: "Code review for latest pull requests",
        priority: "medium",
        completed: false,
        dueDate: new Date("2024-12-16"),
        createdAt: new Date("2024-12-11"),
      },
    ];

    sampleTasks.forEach(task => this.tasks.set(task.id, task));
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = {
      ...insertTask,
      id,
      createdAt: new Date(),
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const existing = this.tasks.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

export const storage = new MemStorage();
