import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTodos, insertTodo, removeTodo, updateDone } from './feature/todoSlice'

const App = () => {
  // const [todos, setTods] = useState('')
  const todos = useSelector(state => state.todos.todos)
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()

  const addTodo = useCallback(() => {
    if (todo) {
      axios.post('http://localhost:8000/api/todos', { todo })
        .then(res => dispatch(insertTodo(res.data.data)))
        .catch(err => console.error(err))
    }
    setTodo('')
  }, [dispatch, todo]);

  const deleteTodo = useCallback((id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then(res => dispatch(removeTodo(res.data.data)))
      .catch(err => console.error(err));
  }, [dispatch]);

  const handleCheckbox = useCallback((e, id) => {
    const isComplete = e.target.checked;
    axios.patch('http://localhost:8000/api/todos/updateIsComplete', { isComplete, id })
      .then(res => dispatch(updateDone(res.data.data._id, res.data.data.isComplete)))
      .catch(err => {
        console.error('Error updating isComplete:', err);
      });
  }, [dispatch]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/todos')
      .then(res => dispatch(setTodos(res.data.data)))
      .catch(err => console.error(err));
  }, [dispatch, todos])
  return (
    <div className='w-full bg-slate-800'>
      <div className='w-full md:w-1/2 bg-slate-900 p-2 mx-auto mt-20'>
        <h2 className='uppercase font-bold text-white text-center my-4'>todo</h2>
        <div className='w-full flex justify-center items-center'>
          <input className='w-[80%] px-2 py-1 rounded-md'
            value={todo}
            type='text'
            placeholder='Enter todo...'
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className='bg-white px-4 py-1 m-1 rounded hover:bg-slate-400'
            type='button'
            onClick={addTodo}
          >Add</button>
        </div>

        <div className='my-4 w-full overflow-y-scroll h-[300px]'>
          {
            todos.length > 0 ? todos.map(todo => (
              <div className='w-full flex justify-center' key={todo._id}>
                <div className={'flex gap-2 w-[90%] bg-slate-300 my-1 p-2 rounded'}>
                  <div className='w-[10%]' >
                    <input className='cursor-pointer'
                      type="checkbox"
                      checked={todo.isComplete}
                      onChange={(e) => handleCheckbox(e, todo._id)}
                    />
                  </div>
                  <div className=' text-slate-800 w-[80%]'
                    style={todo.isComplete ? { textDecoration: "line-through" } : { textDecoration: "none" }}

                  > {todo.todo}</div>
                  <div className='w-[10%]'>
                    <span className='cursor-pointer'
                      onClick={() => (deleteTodo(todo._id))}
                    >❌</span>
                  </div>
                </div>
              </div>
            ))
              :
              <h3 className='text-white font-bold text-center'>No records available</h3>
          }
        </div>
      </div>
    </div >
  )
}

export default App