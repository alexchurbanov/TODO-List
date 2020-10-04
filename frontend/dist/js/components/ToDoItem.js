import React, { Component } from 'react'
import ToDoForm from './ToDoForm';

export default class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            edit: false
        };
        this.handleDone = this.handleDone.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleDone(e) {
        this.props.onDoneChange(this.state.task.id, !this.state.task.done);
    }

    handleEdit(value) {
        const edit = this.state.edit;
        if (edit) {
            this.props.onEdit(this.state.task.id, value)
        }
        this.setState({ edit: !edit });
    }

    handleEditCancel() {
        this.setState({ edit: false });
    }

    handleRemove(){
        this.props.onRemove(this.state.task.id);
    }

    _setClassName(name, doneFlag) {
        return name + (doneFlag ? "-done" : "")
    }

    render() {

        const { task } = this.props;
        const edit = this.state.edit;

        if (edit) {
            return (
                <ToDoForm
                    onSubmit={this.handleEdit}
                    name="Ok"
                    cancel={true}
                    placeholder={task.title}
                    onCancel={this.handleEditCancel} />
            )
        }

        return (
            <div className={this._setClassName("task", task.done)}>
                <span
                    className= "task__title">
                    {task.title}
                </span>
                <button
                    className="task__check_button"
                    onClick={this.handleDone}>
                    {this.state.task.done ? "Not done" : "Done"}
                </button>
                <button
                    className="task__edit_button"
                    onClick={this.handleEdit}>
                    Edit
                </button>
                <button
                    className="task__remove_button"
                    onClick={this.handleRemove}>
                    Remove
                </button>
            </div>
        )
    }
}

