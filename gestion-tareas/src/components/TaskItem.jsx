import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { TagItem } from './TagItem'

const TaskItem = ({ task, setTasks, onEdit }) => {
  const handleDelete = () => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id))
  }
  const toggleComplete = () => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id ? { ...t, isComplete: !t.isComplete } : t
      )
    )
  }

  return (
    <div className='flex justify-between items-center border p-4 mb-2'>
      <div className='flex-col gap-1'>
        <div className='font-bold flex gap-1 items-center'>
          <div onClick={toggleComplete}>
            <FaCheckCircle color={task.isComplete ? 'green' : 'black'} />
          </div>

          {task.name}
        </div>
        <div className='text-sm text-gray-600 grid gap-1 grid-cols-4'>
          {task.tags.map((item, id) => {
            return <TagItem key={id} item={item} />
          })}
        </div>
        <div className='text-sm text-left text-gray-600'>
          Participantes: {task.participants.join(', ')}
        </div>
      </div>
      <div>
        <button
          onClick={() => onEdit(task)} // Activar modo edición
          className='px-4 py-2 bg-yellow-500 text-white rounded mr-2'
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className='px-4 py-2 bg-red-500 text-white rounded'
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  )
}

export default TaskItem
