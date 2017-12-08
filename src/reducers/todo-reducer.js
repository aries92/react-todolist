import {v4} from 'uuid';

const initialState = {
    todo: [{
        id: v4(),
        text: 'Hello World',
        completed: false
    }]

}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todo: [
                    ...state.todo,
                    {
                        id: v4(),
                        text: action.text,
                        completed: false
                    }
                ]
            }

        case 'REMOVE_TODO':
            return {
                ...state,
                todo: [
                    ...state.todo.filter(item => item.id !== action.id),
                ]
            }

        case 'EDIT_TODO':
            return {
                ...state,
                todo: [
                    ...state.todo.map(item =>
                        (item.id === action.id) ? {...item, text: action.text} : item
                    )
                ]
            }

        case 'SET_TODO_COMPLETE':
            return {
                ...state,
                todo: [
                    ...state.todo.map(item =>
                        (item.id === action.id) ? {...item, completed: !item.completed} : item
                    )
                ]
            }

        default:
            return state
    }
}