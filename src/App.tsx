import './App.css'
import {Task, TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';

export type FilterType = 'all' | 'completed' | 'active'
export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'TypeScript', isDone: false},
        {id: 5, title: 'CSS', isDone: true},
    ]);
    const [filter, setFilter] = useState<FilterType>('all')
    let nextTasks: Task[] = tasks
    if (filter === 'completed') {
        nextTasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        nextTasks = tasks.filter(task => !task.isDone)
    }
    const filterTasks = (value: FilterType) => {
        setFilter(value)
    }
    const deleteTask = (id: Task['id']) => {
        nextTasks = tasks.filter((task: Task) => task.id !== id)
        setTasks(nextTasks);
    }
    return (
        <div className="app">
            <TodolistItem title="What to learn"
                          tasks={nextTasks}
                          deleteTask={deleteTask}
                          filterTasks={filterTasks}
            />
        </div>
    );
}


