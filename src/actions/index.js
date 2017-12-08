//filters actions
export const setFilter = filter => ({type: 'SET_FILTER', filter})


//todo actions
export const addTodo = text => ({type: 'ADD_TODO', text})
export const removeTodo = id => ({type: 'REMOVE_TODO', id})
export const editTodo = (id, text) => ({type: 'EDIT_TODO', id, text})
export const setTodoComplete = id => ({type: 'SET_TODO_COMPLETE', id})
