import React from 'react'
import { FaTimes } from 'react-icons/fa'

const TaskElement = ({ task }) => {
    return (
        <div className='task'>
            <h3>{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} /> </h3>
            <p>{task.date}</p>

        </div>
    )
}

export default TaskElement
