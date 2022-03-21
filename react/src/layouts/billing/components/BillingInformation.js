/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useSelector } from 'react-redux';

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from 'react';
import axios from 'axios';

function BillingInformation() {

  const currentTopic = useSelector((state) => state.currentTopic);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getAllTaskByTopicId(currentTopic.topic_id);
  }, []);

  const getAllTaskByTopicId = async (tp_id) => {
    const res = await axios.get('http://localhost:8000/todo/getAllTaskByTopicId', { params: { "topic_id": tp_id } });
    if (res.data.status === "OK") {
      setTaskList(res.data.taskList);
    }
  }

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h4" fontWeight="medium" align="center">
          {currentTopic.topicTitle}
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {taskList.map((task) => {
            return (
              <Bill
                key={task.task_id}
                name={task.taskTitle}
                company={task.priority}
                email={task.startDate}
                vat={task.deadline}
              />
            )
          })}
          {/* <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          /> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
