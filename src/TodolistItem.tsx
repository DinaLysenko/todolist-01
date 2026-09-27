import {Button} from './Button.tsx';
import {FilterType, Todolist} from './App.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './components/CreateItemForm.tsx';
import {EditableSpan} from './components/EditableSpan.tsx';


export type Task = {
    id: string
    title: string
    isDone: boolean
}
type Props = {
    tasks: Task[]
    todolist: Todolist
    todolistId: string
    deleteTask: (id: Task['id'], todolistId: Todolist['id']) => void
    filterTasks: (value: FilterType, todolistId: string) => void
    createTask: (task: string, todolistId: Todolist['id']) => void
    changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone'], todolistId: Todolist['id']) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title:string) => void
    changeTodolistTitle: (todolistId: string, title:string) => void
}
export const TodolistItem = ({
                                 todolist,
                                 tasks,
                                 todolistId,
                                 deleteTask,
                                 filterTasks,
                                 createTask,
                                 changeTaskStatus,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {



    const listItem = tasks.length == 0 ? 'Тасок нет' : tasks.map(t => {
        const deleteTaskHandler = () => {
            deleteTask(t.id, todolist.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, todolist.id)
        }
        const taskChangeHandler=(title:string)=>{
            changeTaskTitle(todolistId, t.id, title)
        }
        return (
            <li key={todolistId} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatusHandler}
                />
                <EditableSpan title={t.title} changeTitle={taskChangeHandler}/>
                <button onClick={deleteTaskHandler}>❌</button>
            </li>
        )
    })

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }
    const createItemHandler=(title:string)=>{
        createTask(title, todolistId)
    }
    const changeTodolistHandler=(title:string)=>{
        changeTodolistTitle(todolistId, title)
    }
    return (
        <div>
            <div className="container">
                <h3><EditableSpan changeTitle={changeTodolistHandler} title={todolist.title}/></h3>
                <Button title={'❌'} onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm createItem={createItemHandler}/>
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