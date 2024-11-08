import { useEffect, useState } from 'react'

export function useTask () {
  const [tasks, setTasks] = useState(() => {
    const taskStorage = window.localStorage.getItem('tasks')
    return taskStorage ? JSON.parse(taskStorage) : []
  })
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  return { tasks, setTasks, editingTask, setEditingTask }
}
