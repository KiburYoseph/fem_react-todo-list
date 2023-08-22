import './App.css'

const App = () => {
  return (
    <>
      <main className='main'>
        <section className='hero'></section>
        <section className='content'>
          <h1>TODO</h1>
          <form>
            <input placeholder='Create a new todo'></input>
            <button className='inputButton'></button>
          </form>
          <div className='list'>
              <div className='listItem'><div className='listCircle'></div> Complete Online Javascript Course</div>
              <div className='listItem'><div className='listCircle'></div> Jog around the park 3x</div>
              <div className='listItem'><div className='listCircle'></div> 10 minutes meditation</div>
              <div className='listItem'><div className='listCircle'></div> Read for 1 hour</div>
            <section className='info'>
              <p>4 items left</p>
              <div className='interactions'>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
              </div>
                <button className='clearComp'>Clear Completed</button>
            </section>
          </div>
          
        </section>

      </main>
    </>
  )
}

export default App