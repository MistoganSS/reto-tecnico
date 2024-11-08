import TaskItem from './TaskItem'

const TaskList = ({ tasks, setTasks, onEdit }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2'>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            setTasks={setTasks}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  )
}

export default TaskList
