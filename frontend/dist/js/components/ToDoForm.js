import React, { Component } from 'react'

export default class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.value || /^\s*$/.test(this.state.value)) {
            return
        }

        this.props.onSubmit(this.state.value);
        this.setState({ value: '' });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleCancel(e) {
        this.props.onCancel();
    }

    render() {
        return (
            <form className="todo__form" onSubmit={this.handleSubmit}>
                <input
                    className="todo__form_input" 
                    type="text" 
                    value={this.state.value} 
                    placeholder={this.props.placeholder} 
                    onChange={this.handleChange} />
                <button className="todo__form_button" type="submit">
                    <span>{this.props.name}</span>
                </button>
                {
                    this.props.cancel === true &&
                    <button
                        className="todo__form_cancel_button"
                        type="button"
                        onClick={this.handleCancel}>
                        Cancel
                    </button>
                }
            </form>
        )
    }
}
