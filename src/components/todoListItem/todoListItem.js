import React from "react";
import './todoListItem.css'

const TodoListItem = (props) => {

        const { label, 
                onDeleted, 
                onToggleImportant, 
                onToggleDone,
                important, done} = props;

        let classNames = 'todo-list-item';
        if ( done ) {
            classNames += ' done';
        }


        if(important) {
            classNames += ' important';
        }
    
        return (
            <span className={classNames}>
                <span className='todo-list-item-label'
                        onClick={ onToggleDone }>
                        { label }
                </span>
                <div className="buttons-all">
                    <button type='button'
                            className='btn btn-outline-success btn-sm float-right'
                            onClick={onToggleImportant}>
                                <i className="fa fa-exclamation"/>
                    </button>
                    <button type='button'
                            className='btn btn-outline-danger btn-sm float-right'
                            onClick={onDeleted}>
                                <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </span>
        )
    }

export default TodoListItem;
