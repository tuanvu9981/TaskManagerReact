import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { useState } from 'react'
import AddTask from "./components/AddTask";

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskList, setTaskList] = useState([
    {
      'id': 1,
      'text': 'Learning ReactJS',
      'date': '2022/Feb/2',
      'reminder': true
    },
    {
      'id': 2,
      'text': 'Jogging',
      'date': '2022/Feb/6',
      'reminder': true
    },
    {
      'id': 3,
      'text': 'Cooking',
      'date': '2022/Feb/7',
      'reminder': false
    }
  ]);

  // Delete One Task
  const deleteOneTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    // console.log('delete task: ', id);
  }

  // Add a new Task
  const addNewTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = {
    //   'id': id,
    //   'text': task.text,
    //   'date': task.date,
    //   'reminder': task.reminder
    // }

    //FOR SHORT: 
    const newTask = { id, ...task } //the rest from task
    setTaskList([...taskList, newTask]);

  }

  // Toggle Reminder 
  const toggleReminder = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
    // console.log(id);
  }

  return (
    <div className="container">
      {/* <Header title='React' ageInt={10} ageChar='10' /> */}
      <Header
        title='Tuan Vu'
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {showAddTask ?
        <AddTask onAdd={addNewTask} />
        : ''
      }
      {taskList.length > 0 ? (
        <TaskList
          taskList={taskList}
          onDelete={deleteOneTask}
          onToggle={toggleReminder} />
      )
        : (
          <h3>You finished all tasks :D</h3>
        )
      }
      {/* Auto-Format: Alt Shift F (Window) */}
      {/* ScreenShot 1 part: Windows Shift S*/}
    </div>
  );
}

export default App;
