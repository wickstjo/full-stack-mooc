import React, { Fragment } from 'react'

const Todo = ({ item, remove, complete }) => {

    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto'
    }
    
    const doneInfo = (
        <Fragment>
            <span id={ 'status' }>This todo is done</span>
            <span>
                <button onClick={ () => remove(item) } id={ 'remove' }> Delete </button>
            </span>
        </Fragment>
    )

    const notDoneInfo = (
        <Fragment>
            <span id={ 'status' }>This todo is not done</span>
            <span>
                <button onClick={ () => remove(item) } id={ 'remove' }>Delete</button>
                <button onClick={ () => complete(item) } id={ 'complete' }>Set as done</button>
            </span>
        </Fragment>
    )

    return (
        <div style={ style }>
            <span id={ 'task' }>{ item.text }</span>
            { item.done ? doneInfo : notDoneInfo }
        </div>
    )
}

export default Todo