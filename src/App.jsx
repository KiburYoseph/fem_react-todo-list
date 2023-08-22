import { useState } from 'react'
import './App.css'

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState([]); 
  const [listState, setListState] = useState('all');


  const handleSumbit = (e) => {
    e.preventDefault()

    if (newItem != '') {
      setTodos(currentTodos => {
        return [...currentTodos,  {
          id: crypto.randomUUID(), title: newItem, completed:false
        }]
      })
  
      setNewItem('')
    }
  }

  const toggleTodo = (id, completed) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id) {
          return  { ...todo, completed: !completed}
        }
        
        return todo

      })
    })
  }

  const deleteTodo = (id) => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  const clearCompleted = () => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.completed == false)
    })
  }

  return (
    <>
      <main className='main'>
        <section className='hero'></section>
        <section className='content'>
          <h1>TODO</h1>
          <form onSubmit={handleSumbit}>
            <input placeholder='Create a new todo' value={newItem} onChange={e => setNewItem(e.target.value)}></input>
            <button className='inputButton'></button>
          </form>
          <div className='list'>
          
          {listState == 'all' ? todos.map(todo => {
              return <div className={`listItem  completed${todo.completed}`} key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle completedCircle${todo.completed}`}>
                
                {todo.completed ? <img src='src/assets/icon-check.svg'></img> : null}
                </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./src/assets/icon-cross.svg'></img></button></div>          

            })  : null}

            {listState == 'active' ? todos.map(todo => {
              if (todo.completed == false) {
                return <div className={`listItem  completed${todo.completed}`} key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle completedCircle${todo.completed}`}>
                
              {todo.completed ? <img src='src/assets/icon-check.svg'></img> : null}
              </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./src/assets/icon-cross.svg'></img></button></div>  
              }
                
            }) : null}

            {listState == 'completed' ? todos.map(todo => {
              if (todo.completed == true) {
                return <div className={`listItem  completed${todo.completed}`} key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle completedCircle${todo.completed}`}>
                
              {todo.completed ? <img src='src/assets/icon-check.svg'></img> : null}
              </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./src/assets/icon-cross.svg'></img></button></div>  
              }
                
            }) : null}
            
            <section className='info'>
              <p>{todos.length} items left</p>
              <div className='interactions'>
                <button onClick={() => setListState('all')}>All</button>
                <button onClick={() => setListState('active')}>Active</button>
                <button onClick={() => setListState('completed')}>Completed</button>
              </div>
                <button className='clearComp' onClick={() => clearCompleted()}>Clear Completed</button>
            </section>
          </div>
          
        </section>

      </main>
    </>
  )
}

export default App