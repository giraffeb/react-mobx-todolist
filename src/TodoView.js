import React from 'react';


class TodoView extends React.Component{
    

    render(){
        const { todo, onClick, deleteTodo } = this.props;
        return (
            <li>
                <b
                style={{
                    textDecoration: todo.toggle ? 'line-through': 'none'
                }} 
                onClick={onClick}> {todo.task}
                </b> 
            
            <button type="submit" onClick={deleteTodo}>delete</button>
            </li>
        )
    }

}

export default TodoView;