import './App.css'
import {Task, TodolistItem} from './TodolistItem.tsx';

export const App = () => {
    const tasks1:Task[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]


    return (
        <div className="app">
            <TodolistItem title='What to learn' tasks={tasks1}/>
        </div>
    );
}


