

import {autorun, computed, observable, action} from 'mobx';

class ObservableTodoStore{
    
    @observable todos = []
    @observable pendingRequests = 0;

    constructor(){
        autorun(()=>console.log("Store create"));
        let sessionTodos = localStorage.getItem("todos");
        if(sessionTodos !== null){
            this.todos = JSON.parse(sessionTodos);
        }
        
    }

    @computed
    get completedTodosCount(){
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }

    @computed
    get report(){
        if (this.todos.length === 0){
            return "<none>";
        }
        return `Next todo: "${this.todos[0].task}".`
                +`Progress: ${this.completedTodosCount} / ${this.todos.length}`
    }

    // @action
    addTodo(newTask){
        

        let todo = {
            task: newTask,
            completed: false,
            assignee: null,
            toggle: false
        }
        console.log('newTask addTodo->', todo);
        // this.todos.push(newTask)
        this.todos.push({
            task: newTask,
            completed: false,
            assignee: null,
            toggle: false
        })

        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    deleteTodo(idx){

        console.log("deleteTOdo");
        console.log("idx->", idx);

        this.todos = this.todos.filter((todo, i)=> i !== idx);

        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    onToggle(idx){
        const nextTodoItems = this.todos.map( (todo, i) => {
            if( i === idx){
                todo.toggle = !todo.toggle
            }
            return todo;
        })

        this.todos = nextTodoItems;

        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}

export default ObservableTodoStore;