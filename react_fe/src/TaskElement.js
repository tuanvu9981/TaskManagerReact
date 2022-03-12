import React from 'react'
import { FaTimes } from 'react-icons/fa'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Checkbox, CheckboxGroup
} from '@chakra-ui/react'

const TaskElement = ({ task, onDelete, onToggle }) => {
    return (
        // <div
        //     className={`task ${task.reminder ? 'reminder' : ''}`}
        //     onDoubleClick={() => onToggle(task.id)}
        // >
        //     <h3>{task.text} <FaTimes
        //         style={{ color: 'red', cursor: 'pointer' }}
        //         onClick={() => onDelete(task.id)} />
        //     </h3>

        //     {/* Origin in App.js: oneDelete = (id) => { } */}
        //     <p>{task.date}</p>

        // </div >
        <>
        </>
    )
}

export default TaskElement

