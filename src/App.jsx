import { useState } from 'react'
import './App.css'

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState([]); 
  const [listState, setListState] = useState('all');
  const [dark, setDark] = useState(true)


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

  {dark ? document.body.style.backgroundColor = "hsl(235, 24%, 19%)" : document.body.style.backgroundColor = "white"}

  return (
    <>
      <main className='main'>
        <section className={`hero dark${dark}`}></section>
        <section className='content'>
          <div className='top'>
            <h1>TODO</h1>
            <img src={dark ? "src/assets/icon-sun.svg" : "src/assets/icon-moon.svg"} onClick={() => setDark(dark => !dark)}></img>
          </div>
          <form onSubmit={handleSumbit}>
            <input placeholder='Create a new todo' value={newItem} onChange={e => setNewItem(e.target.value)} className={`dark${dark}`}></input>
            <button className={`inputButton dark${dark}`}></button>
          </form>
          <div className={`list dark${dark}`}>
          
          {listState == 'all' ? todos.map(todo => {
              return <div className={`listItem dark${dark}  completed${todo.completed}`} key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle dark${dark} completedCircle${todo.completed}`}>
                
                {todo.completed ? <img src='src/assets/icon-check.svg'></img> : null}
                </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./src/assets/icon-cross.svg'></img></button></div>          

            })  : null}

            {listState == 'active' ? todos.map(todo => {
              if (todo.completed == false) {
                return <div className={`listItem dark${dark}  completed${todo.completed}`} key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle dark${dark} completedCircle${todo.completed}`}>
                
              {todo.completed ? <img src='src/assets/icon-check.svg'></img> : null}
              </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./src/assets/icon-cross.svg'></img></button></div>  
              }
                
            }) : null}

            {listState == 'completed' ? todos.map(todo => {
              if (todo.completed == true) {
                return <div className={`listItem dark${dark}  completed${todo.completed}`} key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle dark${dark} completedCircle${todo.completed}`}>
                
              {todo.completed ? <img src='src/assets/icon-check.svg'></img> : null}
              </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./src/assets/icon-cross.svg'></img></button></div>  
              }
                
            }) : null}
            
            <section className={`info dark${dark}`}>
              <p>{(todos.filter(todo => todo.completed != true)).length} items left</p>
              <div className={`interactions dark${dark}`}>
                <button onClick={() => setListState('all')} className={`dark${dark}`} >All</button>
                <button onClick={() => setListState('active')} className={`dark${dark}`}>Active</button>
                <button onClick={() => setListState('completed')} className={`dark${dark}`}>Completed</button>
              </div>
                <button className={`clearComp dark${dark}`} onClick={() => clearCompleted()}>Clear Completed</button>
            </section>
          </div>
          
        </section>

      </main>
    </>
  )
}

export default App