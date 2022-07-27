import React, { Fragment } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
    return (
        <Fragment>
            { todos.map(todo => {
                return (
                    <Todo
                        item={ todo }
                        remove={ deleteTodo }
                        complete={ completeTodo }
                    />
                )
            }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
        </Fragment>
    )
}

export default TodoList
