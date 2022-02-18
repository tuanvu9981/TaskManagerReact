import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { useState } from 'react'

function App() {

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

  return (
    <div>
      {/* <Header title='React' ageInt={10} ageChar='10' /> */}
      <Header title='Tuan Vu' />
      <TaskList taskList={taskList} />

      {/* Auto-Format: Alt Shift F (Window) */}
      {/* ScreenShot 1 part: Windows Shift S*/}
    </div>
  );
}

export default App;
