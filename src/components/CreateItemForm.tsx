import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox'

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
            <IconButton color={'primary'}
                        onClick={createTaskHandler}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}