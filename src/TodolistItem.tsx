import {Button} from './Button.tsx';
import {FilterType, Todolist} from './App.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';


export type Task = {
    id: string
    title: string
    isDone: boolean
}
type Props = {
    tasks: Task[]
    todolist: Todolist
    key: string
    deleteTask: (id: Task['id'], todolistId: Todolist['id']) => void
    filterTasks: (value: FilterType, todolistId: string) => void
    createTask: (task: string, todolistId: Todolist['id']) => void
    changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone'], todolistId: Todolist['id']) => void
    deleteTodolist: (todolistId: string) => void
}
export const TodolistItem = ({
                                 todolist,
                                 tasks,
                                 key,
                                 deleteTask,
                                 filterTasks,
                                 createTask,
                                 changeTaskStatus,
                                 deleteTodolist
                             }: Props) => {


    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const taskTitleValidation = taskTitle.length > 0 && taskTitle.length <= 15;
    const listItem = tasks.length == 0 ? 'Тасок нет' : tasks.map(t => {
        const deleteTaskHandler = () => {
            deleteTask(t.id, todolist.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, todolist.id)
        }
        return (
            <li key={key} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatusHandler}
                />
                <span>{t.title}</span>
                <button onClick={deleteTaskHandler}>❌</button>
            </li>
        )
    })
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskHandler = () => {
        const trimTask = taskTitle.trim()
        if (trimTask != '') {
            createTask(trimTask, todolist.id)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitleValidation) {
            createTaskHandler()
        }
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }
    return (
        <div>
            <div className="container">
                <h3>{todolist.title}</h3>
                <Button title={'❌'} onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <input value={taskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <Button title="➕"
                        onClick={createTaskHandler}
                        disabled={taskTitle.length === 0 || taskTitle.length > 15}/>
            </div>
            {error &&
                <div className={error ? 'error-message' : ''}>{error}</div>}
            {taskTitleValidation && !error && <div>Max length to be 15 characters</div>}
            {taskTitle.length > 15 && <div style={{color: 'red'}}>Your title more than 15 characters</div>}
            <ul>
                {listItem}
            </ul>
            <div>
                <Button onClick={() => filterTasks('all', todolist.id)}
                        className={todolist.filter === 'all' ? 'active-filter' : ''}
                        title={'All'}/>
                <Button onClick={() => filterTasks('active', todolist.id)}
                        className={todolist.filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}/>
                <Button onClick={() => filterTasks('completed', todolist.id)}
                        className={todolist.filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}/>
            </div>
        </div>
    );
}