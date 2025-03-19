import { useContext } from 'react';
import TaskStatus from '../enums/TaskStatus';
import { TaskContext } from '../providers/TaskProvider';

export default function TaskItem({
    id,
    task_name,
    status,
}: {
    id: number;
    task_name: string;
    status: TaskStatus;
}) {
    const { handleDeleteTask, setLoading, handleUpdateTask } =
        useContext(TaskContext)!;

    const handleOnDelete = () => {
        setLoading(true);
        handleDeleteTask(id);
    };

    const handleOnToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const status = e.target.checked ? TaskStatus.DONE : TaskStatus.PENDING;
        handleUpdateTask(id, status);
    };
    return (
        <li className="flex justify-between hover:opacity-75 ">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="w-4 h-4 mr-4 hover:cursor-pointer"
                    onChange={(e) => handleOnToggle(e)}
                    checked={status === TaskStatus.DONE}
                />
                <span
                    className={`text-xl ${
                        status === TaskStatus.DONE && 'line-through'
                    }`}
                >
                    {task_name}
                </span>{' '}
            </div>
            <button
                className="hover:cursor-pointer"
                onClick={() => handleOnDelete()}
            >
                ❌
            </button>
        </li>
    );
}
