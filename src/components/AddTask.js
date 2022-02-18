import React from 'react'
import { useState } from 'react'

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert('Please add a task');
            return
        }
        onAdd({ text, date, reminder })

        setText('');
        setDate('')
        setReminder(false)
    }

    return (
        <div>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label> Task </label>
                    <input
                        type="text"
                        placeholder='Add Task'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label> Date </label>
                    <input
                        type="text"
                        placeholder='Add Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className='form-control form-control-check'>
                    <label> Set Reminder </label>
                    <input
                        type="checkbox"
                        checked={reminder}
                        value={reminder}
                        onChange={(e) => setReminder((e) => e.currentTarget.checked)}
                    />
                </div>

                <input type='submit' value="Save Task" className='btn btn-block' />
            </form>
        </div>
    )
}

export default AddTask
