import React, { Component } from 'react';
import {
    Button,
    Card,
    List,
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
    Divider,
    TextField,
    Input,
    Dialog,
    DialogActions,
    DialogContent,
    BottomNavigation,
    BottomNavigationButton
} from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/'
import './App.css';

class App extends Component {
    state = {
        open: false,
        editingID: false,
        taskText: ''
    };

    handleDialogOpen = () => {
        this.setState({open: true});
    };

    handleDialogClose = () => {
        this.setState({open: false});
    };

    handleAddTodo = () => {
        let task = this.state.taskText;
        this.handleDialogClose();
        this.setState({taskText: ''});
        if (task.length > 0) {
            this.props.actions.addTodo(task)
        }
    };

    handleTextPress = (e) => {
        if (e.key === 'Enter') {
            this.handleAddTodo()
        }
    };

    handleTaskText = (e) => {
        this.setState({taskText: e.target.value});
    };

    handleFilter = (e, filter) => {
        try {
            this.props.history.push({
                pathname: this.props.URL[filter],
                state: filter
            });
        } catch (er) {}
        this.props.actions.setFilter(filter);
    };

    handleRemoveTask = (id) => {
        this.props.actions.removeTodo(id)
    };

    handleEditTask = (id, text) => {
        this.setState({editingID: null});
        this.props.actions.editTodo(id, text)
    };

    handleCheckbox = (id) => {
        this.props.actions.setTodoComplete(id)
    };

    _filterTodo = (todo, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todo;
            case 'SHOW_COMPLETED':
                return todo.filter(item => item.completed);
            case 'SHOW_ACTIVE':
                return todo.filter(item => !item.completed);
            default:
                return todo
        }
    };

    render() {

        let {todo} = this.props.todo;
        let {history, filter, daysInWeek} = this.props;

        if (history.location.pathname === "/") {
            filter = "SHOW_ALL";
        }

        if (history.location.state) {
            filter = history.location.state
        }

        todo = this._filterTodo(todo, filter);
        const counter = todo.length;

        return (
            <div className="App">
                <Card className="todolist">
                    <header className="title">
                        <div className="date">
                            <div className="day">{daysInWeek[new Date().getDay()]}</div>
                            <div className="counter"><b>{counter}</b> task{counter === 1 ? '' : 's'}</div>
                        </div>
                        <div className="tasks">
                            <Button fab color="primary" aria-label="add" className="add"
                                    onClick={this.handleDialogOpen}>
                                <AddIcon />
                            </Button>
                            <Dialog open={this.state.open}
                                    onRequestClose={this.handleDialogClose}>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Your task"
                                        type="textarea"
                                        onChange={this.handleTaskText}
                                        onKeyPress={(e) => this.handleTextPress(e)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleDialogClose} color="accent">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleAddTodo} raised={true} color="primary">
                                        Add
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </header>
                    <main className="content">
                        <List className="list">
                            {todo.map((item) => (
                                <div key={item.id}>
                                    <Divider />
                                    <ListItem dense button className="list-item">
                                        <Checkbox
                                            tabIndex={-1}
                                            onClick={() => this.handleCheckbox(item.id)}
                                            checked={item.completed}
                                        />
                                        <Input
                                            className={item.completed ? 'isCompleted':''}
                                            fullWidth={!(this.state.editingID === item.id)}
                                            disableUnderline={!(this.state.editingID === item.id)}
                                            defaultValue={item.text}
                                            onChange={this.handleTaskText}
                                            onBlur={(e) => this.handleEditTask(item.id, e.target.value)}
                                            onFocus={()=>{this.setState({ editingID: item.id })}}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Delete" onClick={() => this.handleRemoveTask(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </main>
                    <footer>
                        <Divider />
                        <BottomNavigation value={filter} onChange={this.handleFilter} showLabels>
                            <BottomNavigationButton value="SHOW_ALL" label="All"/>
                            <BottomNavigationButton value="SHOW_ACTIVE" label="Active"/>
                            <BottomNavigationButton value="SHOW_COMPLETED" label="Completed"/>
                        </BottomNavigation>
                    </footer>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todo: state.todoReducer,
    filter: state.filterReducer
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

App.defaultProps = {
    daysInWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    URL: {
        SHOW_ALL: '/',
        SHOW_ACTIVE: 'active',
        SHOW_COMPLETED: 'completed',
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)