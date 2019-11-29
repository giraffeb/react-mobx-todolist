import React from 'react';
import { observer, inject } from 'mobx-react';
import TodoView from './TodoView';

@inject('store')
@observer
class TodoList extends React.Component{

    state = {
        value: ""
    }

    onChange= (e)=>{
        let v = e.target.value;
        this.setState({
            value: v.trim()
        });
        // console.log(v);
    }

    onkeydown = (e) => {

        if(e.key === "Enter"){
            if(this.state.value.length > 0){
                this.props.store.addTodo(this.state.value);
                e.target.value = "";
                this.state.value = "";
            }
            
        }
    }

    onDelete = (e, idx)=>{
        console.log("onClicked")
        console.log(e.target.getAttribute("key"));
        let store = this.props.store;
        store.deleteTodo(e, idx);
    }

    onClick = (e, idx)=>{
        console.log("onclick->", idx)
        this.props.store.onToggle(idx);
    }

    render(){
        const { store } = this.props;

        return (
            <div>
                <h1>할일 목록</h1>
                <input type="text" onChange={this.onChange} onKeyDown={this.onkeydown} ></input>
                <ul>
                    {store.todos.map(
                     (todo, idx) => <TodoView  todo={ todo } key={idx} onClick={()=>{this.props.store.onToggle(idx)}} deleteTodo={()=>{this.props.store.deleteTodo(idx) }} />
                    )}
                </ul>
            </div>
        )
    }


}

export default TodoList;