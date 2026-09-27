import './App.css'
import {Task, TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './components/CreateItemForm.tsx';

export type FilterType = 'all' | 'completed' | 'active'
export type Todolist = {
    id: string
    title: string
    filter: FilterType
}
export type Tasks = Record<string, Task[]>
const todolistId1 = v1()
const todolistId2 = v1()

export const App = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<Tasks>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const filterTasks = (value: FilterType, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: value} : t))
    }
    const deleteTask = (id: Task['id'], todolistId: Todolist['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)});
    }
    const createTask = (task: string, todolistId: Todolist['id']) => {
        const newTask: Task = {id: v1(), title: task, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }
    const changeTaskStatus = (taskId: Task['id'], isDone: Task['isDone'], todolistId: Todolist['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle=(todolistId:string, taskId:string, title:string)=>{
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=>t.id===taskId? {...t, title:title} : t)})
    }
    const deleteTodolist = (todolistId: Todolist['id']) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId];
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const newTodolist: Todolist = {id: v1(), title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const changeTodolistTitle=(todolistId: string, title:string)=>{
        setTodolists(todolists.map(t=>t.id===todolistId?{...t, title}:t))
    }
    return (
        <div className="app">
            <CreateItemForm createItem={addTodolist}/>
            {todolists.map(todo => {
                let nextTasks: Task[] = tasks[todo.id]
                if (todo.filter === 'completed') {
                    nextTasks = tasks[todo.id].filter(task => task.isDone)
                }
                if (todo.filter === 'active') {
                    nextTasks = tasks[todo.id].filter(task => !task.isDone)
                }
                return (
                    <TodolistItem
                        todolistId={todo.id}
                        todolist={todo}
                        tasks={nextTasks}
                        deleteTask={deleteTask}
                        filterTasks={filterTasks}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })

            }
        </div>
    );
}


