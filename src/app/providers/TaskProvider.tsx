'use client';

import { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import Task from '../types/Task';
import TaskStatus from '../enums/TaskStatus';

interface TaskContextType {
    tasks: Task[];
    handleAddTask: (
        task: Task,
        setTaskText: (taskText: string) => void
    ) => Promise<void>;
    handleDeleteTask: (id: number) => Promise<void>;
    handleUpdateTask: (id: number, status: TaskStatus) => Promise<void>;
    handleShowTasks: (query_string?: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    initialLoad: boolean;
    currentQueryString: string;
}

export const TaskContext = createContext<TaskContextType | undefined>(
    undefined
);

export default function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const [currentQueryString, setCurrentQueryString] = useState('');

    useEffect(() => {
        handleShowTasks();
    }, []);

    const handleShowTasks = (query_string = '') => {
        setLoading(true);
        setCurrentQueryString(query_string);
        try {
            const fetchTasks = async () => {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/tasks/${query_string}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await response.json();
                setTasks(data);
                console.log(data);
                setLoading(false);
                setInitialLoad(false);
            };

            fetchTasks();
        } catch (err) {
            console.log(err);
            setLoading(false);
            setInitialLoad(false);
        }
    };

    const handleAddTask = async (
        task: Task,
        setTaskText: (taskText: string) => void
    ) => {
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
                setTaskText('');
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
                initialLoad,
                loading,
                tasks,
                currentQueryString,

                handleAddTask,
                handleDeleteTask,
                handleUpdateTask,
                handleShowTasks,
                setLoading,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
