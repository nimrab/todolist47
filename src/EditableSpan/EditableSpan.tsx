import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }


    const changeTitleByButton = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                onBlur={offEditMode}
                autoFocus={true}
                onChange={changeTitleByButton}
            />
            : <span
                onDoubleClick={onEditMode}
            >
                {props.title}

                <button onClick={onEditMode}>edit</button>
        </span>
    )

}