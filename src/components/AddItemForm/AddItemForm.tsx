import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import {RequestStatusType} from '../../store/app-reducer'
import css from './AddItemForm.module.css'


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    status?: RequestStatusType
}

export const AddItemForm = React.memo(
    (props: AddItemFormPropsType) => {
        console.log('AddItemForm rendered')
        const [title, setTitle] = useState<string>("")
        const [error, setError] = useState<boolean>(false)

        const changeTitleByButton = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false)
            setTitle(event.currentTarget.value)
        }

        const changeTitleByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                addItemFn()
            }
        }

        const addItemFn = () => {
            const trimTitle = title.trim()
            if (trimTitle) {
                props.addItem(trimTitle)
            } else {
                setError(true)
            }
            setTitle("")
        }
        const errorMessage = error
            ? <div style={{color: 'red'}}>Title is required!</div>
            : null

        return (
            <div className={css.input_field}>
                <TextField
                    variant={'outlined'}
                    size={'small'}
                    value={title} //будет раб и без присв в перем(полезно, когда обнов стр, а данные сохран)
                    placeholder='Enter new item'
                    onChange={changeTitleByButton}
                    onKeyPress={changeTitleByEnter}
                    error={!!error}
                />
                <IconButton onClick={addItemFn} disabled={props.status === 'loading'}>
                    <AddBoxIcon fontSize={'large'}></AddBoxIcon>
                </IconButton>
                {errorMessage}
            </div>
        )
    })