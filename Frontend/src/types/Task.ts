export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
    id: number;
    title: string;
    description: string;
    position: number;
    updated_at: Date;
    columnId: number;
    created_at: Date;
    priority: Priority;
    due_date: Date;
  }

  export interface CreateTask {
    title: string;
    description: string;
    columnId: number;
    priority: Priority;
    due_date: Date;
  }