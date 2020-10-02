import React, { Component } from 'react'
import ToDoForm from './components/ToDoForm';
import ToDoItem from './components/ToDoItem';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }
        this.handleDoneChage = this.handleDoneChage.bind(this);
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.handleTaskRemove = this.handleTaskRemove.bind(this);
    }

    handleDoneChage(taskId) {
        this.setState(state => {
            return (
                state.tasks.map(task => {
                    if (task.id === taskId) {
                        task.done = !task.done;
                    }
                })
            )
        })
    }

    handleTaskEdit(taskId, newTitle) {
        this.setState(state => {
            return (
                state.tasks.map(task => {
                    if (task.id === taskId) {
                        task.title = newTitle;
                    }
                })
            )
        })
    }

    handleTaskAdd(task) {
        this.setState(state => {
            return ({
                tasks: [...state.tasks, {
                    id: Math.floor(Math.random() * 10000),
                    title: task,
                    done: false
                }]
            })
        })
    }

    handleTaskRemove(taskID){
        this.setState(state => {
            return({
                tasks: state.tasks.filter(task => task.id !== taskID)
            })
        })
    }

    render() {
        const { tasks } = this.state;
        const tasksDone = tasks.filter(task => task.done !== false);
        const taskNotDone = tasks.filter(task => task.done !== true);
        const tasksList = [...taskNotDone, ...tasksDone];

        return (
            <div className="todo">
                <h3 className="todo__active_todos">
                    Active tasks: {taskNotDone.length}
                </h3>
                <h3 className="todo__complited_todos">
                    Completed tasks: {tasksDone.length}
                </h3>
                <ToDoForm
                    onSubmit={this.handleTaskAdd}
                    name="Add Task"
                    cancel={false}
                    placeholder="Task title" />
                <div className="task_box">
                    {tasksList.map(task => (
                        <ToDoItem
                            task={task}
                            onDoneChange={this.handleDoneChage}
                            onEdit={this.handleTaskEdit}
                            onRemove={this.handleTaskRemove}
                            key={task.id}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
