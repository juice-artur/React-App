import { Task } from "./Task";

export interface HistoryOfChangesTask
{
    id: number;

    description: string;

    created_at: Date;

    task: Task;
}
