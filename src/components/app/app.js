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
                {id: 1, name: 'John C.', salary: 800, increase: false, rise: false},
                {id: 2, name: 'Alex M.', salary: 3000, increase: false, rise: false},
                {id: 3, name: 'Carl W.', salary: 5000, increase: false, rise: false},
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => ({
                data: data.filter(item => item.id !== id)
            })
        );
    };

    addItem = (name, salary) => {
        const newItem = {
            id: this.maxId++,
            name: name, 
            salary: salary,
            increase: false,
            rise: false
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) return {...item, [prop]: !item[prop]};
                return item;
            })
        }));
    };

    searchEmp = (items, term) => {
        if (term.length === 0) return items;

        return items.filter(item => item.name.indexOf(term) > -1);
    };

    onUpdateSearch = (term) => {
        this.setState({
            term: term
        });
    };

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter:filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employeesCount = data.length;
        const increasedCount = data.filter(item=>item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo 
                    employeesCount={employeesCount} 
                    increasedCount={increasedCount}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem} 
                    onToggleProp={this.onToggleProp}/>
    
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }

    

    
}

export default App;