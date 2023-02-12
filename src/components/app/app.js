import { Component } from 'react';

import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesList from '../employees-list/employees-list';
import SearchPanel from '../search-panel/search-panel';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'John C.', salary: 800, increase: true},
                {id: 2, name: 'Alex M.', salary: 3000, increase: false},
                {id: 3, name: 'Carl W.', salary: 5000, increase: false},
            ]
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => ({
                data: data.filter(item => item.id !== id)
            })
        );
    };

    // Да, пока могут добавляться пустые пользователи. Мы это еще исправим
    addItem = (name, salary) => {
        const newItem = {
            id: this.maxId++,
            name: name, 
            salary: salary,
            increase: false
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    render() {
        return (
            <div className="app">
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data} 
                    onDelete={this.deleteItem}/>
    
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }

    

    
}

export default App;