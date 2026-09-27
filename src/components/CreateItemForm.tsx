import {Button} from '../Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props={
    createItem:(title:string)=>void
}
export const CreateItemForm = ({createItem}:Props) => {
    const [error, setError] = useState<null | string>(null);
    const [title, setTitle] = useState<string>('');

    const taskTitleValidation = title.length > 0 && title.length <= 15;
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskHandler = () => {
        const trimTask = title.trim()
        if (trimTask != '') {
            createItem(trimTask)
            setTitle('')
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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <Button title="➕"
                    onClick={createTaskHandler}
                    disabled={title.length === 0 || title.length > 15}/>
            {
                error && <div className={error ? 'error-message' : ''}>{error}</div>
            }
            {
                taskTitleValidation && !error && <div>Max length to be 15 characters</div>
            }
            {
                title.length > 15 && <div style={{color: 'red'}}>Your title more than 15 characters</div>
            }
        </div>
  )
}