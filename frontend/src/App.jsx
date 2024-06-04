import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  const addTodo = useCallback(() => {
    if (todo) {
      axios.post('http://localhost:8000/api/todos', { todo })
        .catch(err => console.error(err));
    }
    setTodo('')
  }, [todo]);

  const deleteTodo = useCallback((id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .catch(err => console.error(err));
  }, []);

  const handleCheckbox = useCallback((e, id) => {
    const isComplete = e.target.checked;
    axios.patch('http://localhost:8000/api/todos/updateIsComplete', { isComplete, id })
      .then(response => {
        console.log('isComplete updated successfully', response.data);
      })
      .catch(err => {
        console.error('Error updating isComplete:', err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/todos')
      .then(res => setTodos(res.data.data))
      .catch(err => console.error(err));
  }, [addTodo])
  return (
    <div className='w-full bg-slate-800'>

      <div className='w-full md:w-1/2 bg-slate-900 p-2 mx-auto mt-20'>
        <h2 className='uppercase font-bold text-white text-center my-4'>todo</h2>
        <div className='w-full flex justify-center items-center'>
          <input className='w-[80%] px-2 py-1 rounded-md'
            value={todo}
            type='text'
            placeholder='Enter todo...'
            onChange={(e) => setTodo(e.target.value.trim())}
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