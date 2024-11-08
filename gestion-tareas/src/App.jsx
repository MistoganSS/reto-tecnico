import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useTask } from './hooks/useTask'

function App () {
  const { tasks, setTasks, editingTask, setEditingTask } = useTask()
  const [search, setSearch] = useState('')

  const [page, setPage] = useState(1)
  const tasksPerPage = 4
  // Paginación
  const indexOfLastTask = page * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = tasks
    .filter(task => task.name.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirstTask, indexOfLastTask)

  // Cambiar de página
  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)
  const handleSearch = e => {
    setSearch(e.target.value)
  }
  const handleEdit = task => setEditingTask(task)

  return (
    <div className='container mx-auto p-1'>
      <h1 className='text-2xl font-bold mb-4'>Gestión de Tareas</h1>
      <TaskForm
        setTasks={setTasks}
        tasks={tasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <input
        type='text'
        placeholder='Buscar tareas'
        value={search}
        onChange={handleSearch}
        className='mb-4 p-2 border rounded w-full lg:w-2/4'
      />

      <TaskList tasks={currentTasks} setTasks={setTasks} onEdit={handleEdit} />

      <div className='flex justify-between mt-4'>
        <button
          onClick={prevPage}
          disabled={page === 1}
          className='px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300'
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastTask >= tasks.length}
          className='px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300'
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default App
