import './App.css'
import {Task, TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './components/CreateItemForm.tsx';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {containerSx} from './TodolistItem.styles.ts';
import {NavButton} from './NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, Switch} from '@mui/material';


export type FilterType = 'all' | 'completed' | 'active'
export type Todolist = {
    id: string
    title: string
    filter: FilterType
}
export type Tasks = Record<string, Task[]>
const todolistId1 = v1()
const todolistId2 = v1()

type ThemeMode = 'dark' | 'light'


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
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#5468e1',
            },
        },
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
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)})
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
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))
    }
    const changeMode=()=>{
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
                <AppBar position="static" sx={{ mb: '30px' }}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color='inherit'>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton >Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{ mb: '30px' }}>
                        <CreateItemForm createItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todo => {
                            let nextTasks: Task[] = tasks[todo.id]
                            if (todo.filter === 'completed') {
                                nextTasks = tasks[todo.id].filter(task => task.isDone)
                            }
                            if (todo.filter === 'active') {
                                nextTasks = tasks[todo.id].filter(task => !task.isDone)
                            }
                            return (
                                <Grid key={todo.id}>
                                    <Paper sx={{ p: '0 20px 20px 20px' }}>
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
                                    </Paper>
                                </Grid>
                            )
                        })

                        }
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>

    );
}


