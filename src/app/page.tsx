'use client';
import TaskInput from './ui/TaskInput';
import TaskItem from './ui/TaskItem';
import { useContext } from 'react';
import { TaskContext } from './providers/TaskProvider';
import { BarLoader } from 'react-spinners';
import { Span } from 'next/dist/trace';

export default function Home() {
    const { tasks, loading, initialLoad } = useContext(TaskContext)!;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className=" bg-white text-black rounded w-xl relative">
                    <BarLoader
                        width="100%"
                        color="#fe9a00"
                        loading={loading}
                        cssOverride={{
                            position: 'absolute',
                            width: '100%',
                            top: 0,
                        }}
                    />

                    <div className="p-6">
                        <header className="mb-6">
                            <h1 className="text-3xl mb-4">Taskify List 📝</h1>

                            <TaskInput />
                        </header>

                        {/* task list container */}
                        <div>
                            <ul className="flex flex-col gap-4">
                                {initialLoad ? (
                                    <span className="border-dashed border p-4 border-amber-600 bg-amber-100">
                                        Loading... 💁‍♂️
                                    </span>
                                ) : tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            id={task.id!}
                                            task_name={task.task_name}
                                            status={task.status}
                                        />
                                    ))
                                ) : (
                                    <span className="border-dashed border p-4 border-amber-600 bg-amber-100">
                                        No Tasks. Please Add! 💁‍♂️
                                    </span>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
