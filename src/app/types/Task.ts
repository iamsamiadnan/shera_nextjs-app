import TaskStatus from '../enums/TaskStatus';

interface Task {
    id?: number;
    task_name: string;
    status: TaskStatus;
}

export default Task;
