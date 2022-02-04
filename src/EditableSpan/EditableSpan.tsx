import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

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

  const changeTitleOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          setEditMode(!editMode)
          props.changeTitle(title)
      }
  }


    return (
        editMode
            ?
            <TextField
                value={title}
                onBlur={offEditMode}
                autoFocus={true}
                onChange={changeTitleByButton}
                onKeyPress={changeTitleOnKeyPress}

                style={{width:'120px'}}
                />
            // <input
            //     value={title}
            //     onBlur={offEditMode}
            //     autoFocus={true}
            //     onChange={changeTitleByButton}
            // />
            : <span
                onDoubleClick={onEditMode}
            >
                {props.title}
                <IconButton onClick={onEditMode} size={'small'}>
                    <Edit fontSize={'small'}></Edit>
                </IconButton>
        </span>
    )

})