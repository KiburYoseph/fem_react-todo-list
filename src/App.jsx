import { useState, useRef, useEffect } from 'react'
import './App.css'

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  }); 
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

  let dragItem = useRef(null)
  let dragOverItem = useRef(null)

  const handleSort = () => {

    let _todos = [...todos]

    const draggedItemContent = _todos.splice(dragItem.current, 1)[0]

    _todos.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = null
    dragOverItem.current = null

    setTodos(_todos)
  }


  {dark ? document.body.style.backgroundColor = "hsl(235, 21%, 11%)" : document.body.style.backgroundColor = "white"}


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])


  return (
    <>
      <main className='main'>
        <section className={`hero dark${dark}`}></section>
        <section className='content'>
          <div className='top'>
            <h1>TODO</h1>
            <img src={dark ? "./assets/icon-sun.svg" : "./assets/icon-moon.svg"} onClick={() => setDark(dark => !dark)}></img>
          </div>
          <form onSubmit={handleSumbit}>
            <input placeholder='Create a new todo' value={newItem} onChange={e => setNewItem(e.target.value)} className={`dark${dark}`}></input>
            <button className={`inputButton dark${dark}`}></button>
          </form>
          <div className={`list dark${dark}`}>
          
          {listState == 'all' ? todos.map(todo => {
              return <div className={`listItem dark${dark}  completed${todo.completed}`} draggable 
              onDragStart={(e) => dragItem.current = todos.indexOf(todo)} 
              onDragEnter={(e) => {dragOverItem.current = todos.indexOf(todo)}}
              onDragEnd={handleSort}
              key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle dark${dark} completedCircle${todo.completed}`}>
                
                {todo.completed ? <img src='./assets/icon-check.svg'></img> : null}
                </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./assets/icon-cross.svg'></img></button></div>          

            })  : null}

            {listState == 'active' ? todos.map(todo => {
              if (todo.completed == false) {
                return <div className={`listItem dark${dark}  completed${todo.completed}`} draggable
                onDragStart={(e) => dragItem.current = todos.indexOf(todo)}
                onDragEnter={(e) => dragOverItem.current = todos.indexOf(todo)}
                onDragEnd={handleSort}
                key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle dark${dark} completedCircle${todo.completed}`}>
                
              {todo.completed ? <img src='./assets/icon-check.svg'></img> : null}
              </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./assets/icon-cross.svg'></img></button></div>  
              }
                
            }) : null}

            {listState == 'completed' ? todos.map(todo => {
              if (todo.completed == true) {
                return <div className={`listItem dark${dark} completed${todo.completed}`} draggable 
                onDragStart={(e) => dragItem.current = todos.indexOf(todo)}
                onDragEnter={(e) => dragOverItem.current = todos.indexOf(todo)}
                onDragEnd={handleSort}
                key={todo.id} onClick={() => toggleTodo(todo.id, todo.completed)}><div className={`listCircle dark${dark} completedCircle${todo.completed}`}>
                
              {todo.completed ? <img src='./assets/icon-check.svg'></img> : null}
              </div> {todo.title} <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}><img src='./assets/icon-cross.svg'></img></button></div>  
              }
                
            }) : null}
            
            <section className={`info dark${dark}`}>
              <p>{(todos.filter(todo => todo.completed != true)).length} items left</p>
              <div className={`interactions inside dark${dark}`}>
                <button onClick={() => setListState('all')} className={`dark${dark}`} >All</button>
                <button onClick={() => setListState('active')} className={`dark${dark}`}>Active</button>
                <button onClick={() => setListState('completed')} className={`dark${dark}`}>Completed</button>
              </div>
                <button className={`clearComp dark${dark}`} onClick={() => clearCompleted()}>Clear Completed</button>
                
            </section>
            
          </div>
          
          <div className={`interactions outside dark${dark}`}>
                <button onClick={() => setListState('all')} className={`dark${dark}`} >All</button>
                <button onClick={() => setListState('active')} className={`dark${dark}`}>Active</button>
                <button onClick={() => setListState('completed')} className={`dark${dark}`}>Completed</button>
          </div>
          <h4>Drag and drop to reorder list</h4>
          
        </section>

      </main>
    </>
  )
}

export default App