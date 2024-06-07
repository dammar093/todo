import {createSlice} from "@reduxjs/toolkit"
const initialState={
  todos:[]
}

const todoSlice = createSlice({
 name:'todos',
 initialState,
 reducers:{
  setTodos:(state,action)=>{
  state.todos = action.payload
  },
  insertTodo : (state,action)=>{
    state.todos=state.todos.push(action.payload)
  },
  removeTodo:(state,action)=>{
    state.todos=state.todos.filter(todo=>todo.id !== action.payload)
  },
  updateDone:(state,action)=>{
    const index = state.todos.findIndex(action.payload.id)
    state.todos[index].isComplete=action.payload.isComplete
  }
 }
})

export const {insertTodo,removeTodo,updateDone,setTodos} = todoSlice.actions

export default todoSlice.reducer