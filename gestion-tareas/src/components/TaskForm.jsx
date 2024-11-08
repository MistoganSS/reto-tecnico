import React, { useState, useEffect } from 'react'

const TaskForm = ({ setTasks, tasks, editingTask, setEditingTask }) => {
  const [taskName, setTaskName] = useState('')
  const [tags, setTags] = useState('')
  const [participants, setParticipants] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name)
      setTags(editingTask.tags.join(', '))
      setParticipants(editingTask.participants.join(', '))
    }
  }, [editingTask])

  const handleSubmit = e => {
    e.preventDefault()

    if (taskName) {
      if (editingTask) {
        const updatedTasks = tasks.map(task =>
          task.id === editingTask.id
            ? {
                ...task,
                name: taskName,
                tags: tags.split(',').map(tag => tag.trim()),
                participants: participants
                  .split(',')
                  .map(participant => participant.trim())
              }
            : task
        )
        setTasks(updatedTasks)
        setEditingTask(null)
      } else {
        const newTask = {
          id: Date.now(),
          name: taskName,
          tags: tags.split(',').map(tag => tag.trim()),
          isComplete: false,
          participants: participants
            .split(',')
            .map(participant => participant.trim())
        }
        setTasks([newTask, ...tasks])
      }

      clearInputs()
    }
  }
  const handleCancelEditing = () => {
    setEditingTask(null)
    clearInputs()
  }
  const clearInputs = () => {
    setTaskName('')
    setTags('')
    setParticipants('')
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4 flex w-full lg:w-2/4 mx-auto'>
      <div className='flex flex-1 flex-col gap-2 w-full'>
        <input
          type='text'
          placeholder='Nombre de la tarea'
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          className='p-2 border rounded mr-2'
        />
        <input
          type='text'
          placeholder='Etiquetas (separadas por coma)'
          value={tags}
          onChange={e => setTags(e.target.value)}
          className='p-2 border rounded mr-2'
        />
        <input
          type='text'
          placeholder='Participantes (separados por coma)'
          value={participants}
          onChange={e => setParticipants(e.target.value)}
          className='p-2 border rounded mr-2'
        />
      </div>

      <div className='flex flex-col gap-2 justify-center mt-2'>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          {editingTask ? 'Guardar cambios' : 'Agregar tarea'}
        </button>
        {editingTask && (
          <button
            type='button'
            onClick={handleCancelEditing}
            className='ml-2 px-4 py-2 bg-gray-500 text-white rounded'
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
