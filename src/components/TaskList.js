import React from 'react'
import TaskElement from '../TaskElement';

const TaskList = (props) => {

    return (
        <div>
            {props.taskList.map((oneTask) => (
                // <h3 key={taskElement.id}> {taskElement.text} </h3>
                <TaskElement
                    key={oneTask.id}
                    task={oneTask}
                    onDelete={props.onDelete}
                    onToggle={props.onToggle}
                />
            ))}
        </div>
    )
}

export default TaskList;
