import {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
    createItem: (title: string) => void
}
export const CreateItemForm = ({createItem}: Props) => {
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
            <TextField
                       label="Enter title"
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       helperText={error}
            />
            <Button variant="contained"
                    size={'small'}
                    onClick={createTaskHandler}>➕</Button>
        </div>
    )
}