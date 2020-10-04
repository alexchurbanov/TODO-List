import React, { Component } from 'react'
import ToDoForm from './components/ToDoForm';
import ToDoItem from './components/ToDoItem';
import postData from './requests';

const url = "http://127.0.0.1:8000/"
const tasksApi = "tasks/"

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            isLoading: true,
        }
        this.handleDoneChage = this.handleDoneChage.bind(this);
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.handleTaskRemove = this.handleTaskRemove.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(url + tasksApi)
            .then(response => response.json())
            .then(data => this.setState({ tasks: data, isLoading: false }))
            .catch(error => this.setState({ isLoading: false }));
    }

    handleDoneChage(taskId, flag) {
        postData(url + tasksApi + taskId + '/', { done: flag }, 'PATCH')
            .then(() =>
                this.setState(state => {
                    return (
                        state.tasks.map(task => {
                            if (task.id === taskId) {
                                task.done = flag;
                            }
                        })
                    )
                })
            )
    }

    handleTaskEdit(taskId, newTitle) {
        postData(url + tasksApi + taskId + '/', { title: newTitle }, 'PATCH')
            .then(() =>
                this.setState(state => {
                    return (
                        state.tasks.map(task => {
                            if (task.id === taskId) {
                                task.title = newTitle;
                            }
                        })
                    )
                })
            )
    }

    handleTaskAdd(task) {
        postData(url + tasksApi, { title: task })
            .then(data => this.setState(state => {
                return ({
                    tasks: [...state.tasks, data]
                })
            }))
    }

    handleTaskRemove(taskID) {
        fetch(url + tasksApi + taskID + '/', { method: 'DELETE' })
            .then(response => {
                if (response.status == 204) {
                    this.setState(state => {
                        return ({
                            tasks: state.tasks.filter(task => task.id !== taskID)
                        })
                    });
                }
            });

    }

    render() {
        const { tasks, isLoading, error } = this.state;
        const tasksDone = tasks.filter(task => task.done !== false);
        const taskNotDone = tasks.filter(task => task.done !== true);
        const tasksList = [...taskNotDone, ...tasksDone];

        if (isLoading) {
            return (
                <div className="todo">
                    <p>Loading...</p>
                </div>)
        }

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
