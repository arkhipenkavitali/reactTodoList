import React from 'react'

import './TodoListItem.css'

const TodoListItem = ({label, onDeleted, onImportantItem, onDoneItem, important, done}) => {

    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done'
    }

    if (important) {
        classNames += ' important'
    }

    return (
        <span className={classNames}>
            <span className="todo-list-item-label" onClick={onDoneItem}>
                {label}
            </span>
            <button className="button btn-outline-success btn-sm" onClick={onImportantItem}>
                <i className="fa fa-exclamation"/>
            </button>
            <button className="button btn-outline-danger btn-sm" onClick={onDeleted}>
                <i className="fa fa-trash-o"/>
            </button>
        </span>
    );
}

export default TodoListItem;