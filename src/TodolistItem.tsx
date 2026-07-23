import {Button} from './Button.tsx';
import {FilterType} from './App.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';


export type Task = {
    id: string
    title: string
    isDone: boolean
}
type Props = {
    title: string
    tasks: Task[]
    filter: FilterType
    deleteTask: (id: Task['id']) => void
    filterTasks: (value: FilterType) => void
    createTask: (task: string) => void
    changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone']) => void
}
export const TodolistItem = ({
                                 title,
                                 tasks,
                                 filter,
                                 deleteTask,
                                 filterTasks,
                                 createTask,
                                 changeTaskStatus
                             }: Props) => {


    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<null | string>(null);

    const taskTitleValidation = taskTitle.length > 0 && taskTitle.length <= 15;
    const listItem = tasks.length == 0 ? 'Тасок нет' : tasks.map(t => {
        const onClickHandler = () => {
            deleteTask(t.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone?'is-done':''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatusHandler}
                />
                <span >{t.title}</span>
                <button onClick={onClickHandler}>❌</button>
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
            createTask(trimTask)
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
    return (
        <div>
            <h3>{title}</h3>
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
                <Button onClick={() => filterTasks('all')}
                        className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}/>
                <Button onClick={() => filterTasks('active')}
                        className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}/>
                <Button onClick={() => filterTasks('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}/>
            </div>
        </div>
    );
}