import {Button} from './Button.tsx';
import {FilterType} from './App.tsx';

export type Task = {
    id: number
    title: string
    isDone: boolean
}
type Props = {
    title: string
    tasks: Task[]
    deleteTask: (id: Task['id']) => void
    filterTasks: (value: FilterType) => void
}
export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 filterTasks
                             }: Props) => {

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

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="➕"/>
            </div>
            <ul>
                {listItem}
            </ul>
            <div>
                <Button onClick={()=>filterTasks('all')} title={'All'}/>
                <Button onClick={()=>filterTasks('active')} title={'Active'}/>
                <Button onClick={()=>filterTasks('completed')} title={'Completed'}/>
            </div>
        </div>
    );
}