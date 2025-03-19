'use client';

import { AppContextType } from 'next/dist/shared/lib/utils';
import { ContextType, createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import Task from '../types/Task';
import TaskStatus from '../enums/TaskStatus';

interface TaskContextType {
    tasks: Task[];
    handleAddTask: (task: Task) => Promise<void>;
    handleDeleteTask: (id: number) => Promise<void>;
    handleUpdateTask: (id: number, status: TaskStatus) => Promise<void>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
    undefined
);

export default function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const fetchTasks = async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/tasks/`,
                    {
                        method: 'GET',
                    }
                );
                const data = await response.json();
                setTasks(data);
                console.log(data);
            };

            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleAddTask = async (task: Task) => {
        try {
            const addTasks = async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/tasks/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    }
                );
                const data = await response.json();
                setTasks(data);
                console.log(data);
                setLoading(false);
            };

            addTasks();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const deleteTask = async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/tasks/${id}/`,
                    {
                        method: 'DELETE',
                    }
                );
                const data = await response.json();
                setTasks(data);
                console.log(data);
                setLoading(false);
            };

            deleteTask();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateTask = async (id: number, status: TaskStatus) => {
        console.log(status.toString(), status);
        try {
            const updateTask = async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/tasks/${id}/`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            status: status,
                        }),
                    }
                );
                const data = await response.json();
                setTasks(data);
                console.log(data);
                setLoading(false);
            };

            updateTask();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                handleAddTask,
                handleDeleteTask,
                handleUpdateTask,
                loading,
                setLoading,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
