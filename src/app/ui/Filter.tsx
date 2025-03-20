import React, { useContext } from 'react';
import { TaskContext } from '../providers/TaskProvider';

export default function Filter() {
    const { handleShowTasks, currentQueryString } = useContext(TaskContext)!;

    return (
        <div className="mb-2 flex justify-end border-dashed border rounded p-2">
            <span className="mr-2">Filter by: </span>
            <div className="flex gap-2">
                <button
                    className={`underline cursor-pointer hover:opacity-75 ${
                        currentQueryString === '' && 'text-amber-500'
                    }`}
                    onClick={() => handleShowTasks()}
                >
                    All
                </button>
                <span>|</span>
                <button
                    className={`underline cursor-pointer hover:opacity-75 ${
                        currentQueryString === '?status=pending' &&
                        'text-amber-500'
                    }`}
                    onClick={() => handleShowTasks('?status=pending')}
                >
                    Pending
                </button>
                <span>|</span>
                <button
                    className={`underline cursor-pointer hover:opacity-75 ${
                        currentQueryString === '?status=done' &&
                        'text-amber-500'
                    }`}
                    onClick={() => handleShowTasks('?status=done')}
                >
                    Done
                </button>
            </div>
        </div>
    );
}
