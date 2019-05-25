import React, {Component} from 'react'

import AppHeader from '../AppHeader/AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter'
import TodoList from '../TodoList/TodoList'
import ItemAddForm from '../ItemAddForm/ItemAddForm'

import './App.css'

export default class App extends Component {

    stepId = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Chill')
        ],
        term: '',
        filtered: 'all'
    };

    createTodoItem(label){
        return {
            label,
            done: false,
            important: false,
            id: this.stepId++
        }
    }

    deleteItem = (num) => {
        this.setState(({todoData})=> {
           const idx = todoData.findIndex((el) => el.id === num);

           const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

           return {
               todoData: newArray
           }
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];

            return {
                todoData: newArray
            }
        });
    };

    toggleProperty(arr, id, property){
        const idx = arr.findIndex((el) => el.id === id);

        //1.update object
        const oldItem = arr[idx];
        const newItem = {...oldItem, [property]: !oldItem[property]};

        //2.construct new array
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onImportant = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onDone = (id) => {
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    search(items, term){
        if(term.length === 0){
            return items;
        }

        return items.filter((item) => {
           return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    searchChange = (term) => {
      this.setState({term})
    };

    filterChange = (filtered) => {
        this.setState({filtered})
    };

    filter(items, filter){
        switch(filter){
            case 'all': return items;
            case 'active': return items.filter(item => !item.done);
            case 'done': return items.filter(item => item.done);
            default: return items;
        }
    }

    render(){
        const {todoData, term, filtered} = this.state;

        const visibleItem = this.filter(
            this.search(todoData, term), filtered);

        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.searchChange} />
                    <ItemStatusFilter filter={filtered}
                                      onFilterChange={this.filterChange}
                    />
                </div>
                <TodoList todos = { visibleItem }
                          onDeleted={this.deleteItem}
                          onImportantToggle={this.onImportant}
                          onDoneToggle={this.onDone}
                />
                <ItemAddForm addItem={this.addItem}/>
            </div>
        )
    }
}