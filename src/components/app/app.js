import React, { Component } from "react";

import TodoList from "../todoList";
import AppHeader from "../appHeader";
import SearchPanel from "../searchPanel";
import ItemStatusFilter from "../itemStatusFilter";
import ItemAddForm from "../itemAddForm";
// import { CaesarCipher } from '../test';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(( {todoData} ) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const newArr = [...todoData.slice(0, idx), 
                            ...todoData.slice(idx + 1)]
            return {
                todoData: newArr,
            }
        } )  
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(( {todoData} ) => {
            const newArr = [
                            ...todoData,
                            newItem]
            return {
                todoData: newArr,
            }
        })
    };

    toggleProperty(arr, id, propName) {
            const idx = arr.findIndex((el) => el.id === id)
            const oldItem = arr[idx];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};

            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ]
                
        
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onSearchChange = (term) => {
        this.setState({term})
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    render() {

        const { todoData, term } = this.state;

        const visibleItems = this.search(todoData, term)

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        // console.log(CaesarCipher('zzzzYYYy !,=,\',+', 5))
        return (
            <div className="todo-app">
                <AppHeader toDo={doneCount} done={todoCount}/>
                <div className='top-panel d-flex'>
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter/>
                </div>
                <TodoList todos={visibleItems}
                        onDeleted={ this.deleteItem }
                        onToggleImportant={this.onToggleImportant}
                        onToggleDone={this.onToggleDone}/> 
                <ItemAddForm onAddItem={ this.addItem }/>
            </div>
        )
    }
}
