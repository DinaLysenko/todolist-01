import './App.css'
import {Task, TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

export type FilterType = 'all' | 'completed' | 'active'
export const App = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
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
    const createTask = (task: string) => {
        const newTask: Task = {id: v1(), title: task, isDone: false};
        setTasks([...tasks, newTask])
    }
    return (
        <div className="app">
            <TodolistItem title="What to learn"
                          tasks={nextTasks}
                          deleteTask={deleteTask}
                          filterTasks={filterTasks}
                          createTask={createTask}
            />
        </div>
    );
}


