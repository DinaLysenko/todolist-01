import {Button} from './Button.tsx';
import {FilterType} from './App.tsx';
import {useState} from 'react';


export type Task = {
    id: string
    title: string
    isDone: boolean
}
type Props = {
    title: string
    tasks: Task[]
    deleteTask: (id: Task['id']) => void
    filterTasks: (value: FilterType) => void
    createTask: (task: string) => void
}
export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 filterTasks,
                                 createTask,
                             }: Props) => {


    const [taskTitle, setTaskTitle] = useState<string>('');
    const listItem = tasks.length == 0 ? 'Тасок нет' : tasks.map(t => {
        const onClickHandler = () => {
            deleteTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={onClickHandler}>❌</button>
            </li>
        )
    })
    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
                <Button title="➕"
                        onClick={createTaskHandler}
                        disabled={taskTitle.length === 0 || taskTitle.length > 15}/>
            </div>
            {taskTitle.length === 0 && <div>Enter title and click button</div>}
            {taskTitle.length > 15 && <div style={{color: 'red'}}>Your title more than 15 characters</div>}
            <ul>
                {listItem}
            </ul>
            <div>
                <Button onClick={() => filterTasks('all')} title={'All'}/>
                <Button onClick={() => filterTasks('active')} title={'Active'}/>
                <Button onClick={() => filterTasks('completed')} title={'Completed'}/>
            </div>
        </div>
    );
}