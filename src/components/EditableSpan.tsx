import {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type Props = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = ({title, changeTitle}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const editModeActivate = () => {
        setEditMode(true)
    }
    const editModeDeactivate = () => {
        setEditMode(false)
        changeTitle(value)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <>
            {!editMode && <span onDoubleClick={editModeActivate}>{title}</span>}
            {editMode && <TextField label="Enter title"
                                    variant="outlined"
                                    value={value}
                                    onBlur={editModeDeactivate}
                                    onChange={onChangeHandler}
                                    autoFocus
            />
            }
        </>
    )
}