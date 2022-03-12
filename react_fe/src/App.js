import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { useState } from 'react'
import AddTask from "./components/AddTask";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Text, useColorModeValue, 
  Checkbox, CheckboxGroup
} from '@chakra-ui/react'

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const notificationColor = useColorModeValue("gray.700", "white");
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
    // <div className="container">
    //   {/* <Header title='React' ageInt={10} ageChar='10' /> */}
    //   <Header
    //     title='Tuan Vu'
    //     onAdd={() => setShowAddTask(!showAddTask)}
    //     showAdd={showAddTask}
    //   />

    //   {showAddTask ?
    //     <AddTask onAdd={addNewTask} />
    //     : ''
    //   }
    //   {taskList.length > 0 ? (
    //     <TaskList
    //       taskList={taskList}
    //       onDelete={deleteOneTask}
    //       onToggle={toggleReminder} />
    //   )
    //     : (
    //       <h3>You finished all tasks :D</h3>
    //     )
    //   }
    //   {/* Auto-Format: Alt Shift F (Window) */}
    //   {/* ScreenShot 1 part: Windows Shift S*/}
    // </div>

    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            {/* <Box flex='1' textAlign='left' w="20px" h="20px">
              {taskList[0].text}
            </Box> */}

            <Text fontSize="14px" mb="5px" color={notificationColor} size='sm'>
              <Text fontWeight="bold" fontSize="14px" as="span">
                {taskList[0].text}
              </Text>
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Deadline: {taskList[0].date}
        </AccordionPanel>
      </AccordionItem>

      {/* <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Section 2 title
                </Box>
                {isExpanded ? (
                  <AccordionIcon />
                ) : (
                  <AccordionIcon />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </AccordionPanel>
          </>
        )}
      </AccordionItem> */}
    </Accordion>
  );
}

export default App;
