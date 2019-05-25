import React from "react";

import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoList.css';

const TodoList = ({todos, onDeleted, onImportantToggle, onDoneToggle}) => {

    const elements = todos.map((item) => {

        const {id, ...itemProps} = item;

        return (
            <li key={id} className="list-group-item">
                <TodoListItem {...itemProps}
                              onDeleted={() => onDeleted(id)}
                              onImportantItem={() => onImportantToggle(id)}
                              onDoneItem={()=> onDoneToggle(id)}
                />
            </li>
        )
    });

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    )
};

export default TodoList;