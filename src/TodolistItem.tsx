import {Button} from './Button.tsx';

export type Task = {
    id: number
    title: string
    isDone: boolean
}
type Props = {
    title: string
    tasks: Task[]
}
export const TodolistItem = ({title, tasks}: Props) => {

    const listItem = tasks.length == 0 ? 'Тасок нет' : tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <ul>
                {listItem}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
}