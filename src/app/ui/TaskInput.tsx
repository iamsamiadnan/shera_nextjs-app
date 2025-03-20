import { useContext, useState } from 'react';
import { TaskContext } from '../providers/TaskProvider';
import Task from '../types/Task';
import TaskStatus from '../enums/TaskStatus';

export default function TaskInput() {
    const [taskText, setTaskText] = useState('');
    const [error, setError] = useState('');
    const { handleAddTask, setLoading } = useContext(TaskContext)!;

    // handling validation on change
    const handleTaskText = (text: string) => {
        const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};:'",.?]*$/;
        if (regex.test(text)) {
            setTaskText(text);
            setError('');
        } else {
            setError(`🙅‍♂️ '${text.charAt(text.length - 1)}' NOT ALLOWED!`);
        }
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const task: Task = {
            task_name: taskText,
            status: TaskStatus.PENDING,
        };

        handleAddTask(task, setTaskText);
    };

    return (
        <form onSubmit={handleOnSubmit} className="flex flex-col">
            <div className="flex flex-1">
                <input
                    type="text"
                    className="border border-r-0 rounded rounded-r-none h-9 flex-1 px-6 hover:outline-0 focus:outline-0"
                    value={taskText}
                    onChange={(e) => handleTaskText(e.target.value)}
                    placeholder="What's on your list? 👋"
                />
                <input
                    type="submit"
                    value="Add"
                    className="hover:cursor-pointer hover:bg-amber-500 h-9 bg-amber-600 rounded text-white px-9 border border-black relative right-0.5"
                />
            </div>

            {error && (
                <span className="bg-red-200 p-2 rounded text-sm mt-1 text-red-500 font-medium border border-red-500">
                    {error}
                </span>
            )}
        </form>
    );
}
