
import {FilterType, Todolist} from './App.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './components/CreateItemForm.tsx';
import {EditableSpan} from './components/EditableSpan.tsx';
import  IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {containerSx, getListItemSx} from './TodolistItem.styles.ts';



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
            <ListItem key={todolistId}  sx={getListItemSx(t.isDone)}>
                <div>
                    <Checkbox checked={t.isDone}
                              onChange={changeTaskStatusHandler}/>
                    <EditableSpan title={t.title} changeTitle={taskChangeHandler}/>
                </div>
                <IconButton aria-label="delete"
                            onClick={deleteTaskHandler}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
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
                <IconButton aria-label="delete"
                            onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <CreateItemForm createItem={createItemHandler}/>
            <List>
                {listItem}
            </List>
            <Box sx={containerSx}>
                <Button onClick={() => filterTasks('all', todolist.id)}
                        variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}>All
                </Button>
                <Button onClick={() => filterTasks('active', todolist.id)}
                        variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}>Active
                </Button>
                <Button onClick={() => filterTasks('completed', todolist.id)}
                        variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}>Completed
                </Button>
            </Box>
        </div>
    );
}