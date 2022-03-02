import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import Todolist from "../Todolist";
import {Navigate} from "react-router-dom";

const TodoLists: React.FC<any> = ({todoLists, isLoggedIn}) => {
    if (!isLoggedIn) {
        return (
            <Navigate to='/login'/>
        )
    }

    return (
        <>
            {todoLists.map((el: any) => {
                return (
                    <Grid item key={el.id}>
                        <Paper elevation={5} style={{padding: '10px 10px 10px 10px'}}>
                            <Todolist
                                todoList={el}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};

export default TodoLists;