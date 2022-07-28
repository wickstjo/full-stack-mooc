import React, { Fragment } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
    return (
        todos.map(todo =>
            <Fragment key={ todo._id }>
                <hr />
                <Todo
                    item={ todo }
                    remove={ deleteTodo }
                    complete={ completeTodo }
                />
            </Fragment>
        )
    )
}

export default TodoList
