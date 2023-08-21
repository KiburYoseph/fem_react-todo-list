import './App.css'

const App = () => {
  return (
    <>
      <main className='main'>
        <section className='hero'></section>
        <section className='content'>
          <h1>TODO</h1>
          <form>
            <input placeholder='Create a new todo'/>
          </form>
          <div className='list'>
            <ul>
              <li><div className='listCircle'></div> Complete Online Javascript Course</li>
              <li><div className='listCircle'></div> Jog around the park 3x</li>
              <li><div className='listCircle'></div> 10 minutes meditation</li>
              <li><div className='listCircle'></div> Read for 1 hour</li>
            </ul>
          </div>
          <section className='info'>
            <p>4 items left</p>
            <div className='interactions'>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
              <button>Clear Completed</button>
            </div>
          </section>
        </section>

      </main>
    </>
  )
}

export default App