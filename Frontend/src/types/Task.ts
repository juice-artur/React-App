export interface Task {
    id: number;
    title: string;
    description: string;
    position: number;
    created_at: Date;
    updated_at: Date;
    columnId: number;

  }


  export interface CreateTask {
    title: string;
    description: string;
    columnId: number;

  }