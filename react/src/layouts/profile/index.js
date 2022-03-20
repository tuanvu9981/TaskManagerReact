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

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { personIdSelector } from '../../redux/selectors';
import axios from 'axios';

// @mui material components
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceHolderCard";

// Overview page components
import Header from "layouts/profile/components/Header";

import { setCurrentTopicList } from "../../redux/actions";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {

  const topicList = useSelector((state) => state.topicList);
  
  const [newTopicName, setNewTopicName] = useState("");
  const [control, setControl] = useState(false);
  const currentPersonId = useSelector(personIdSelector);
  const dispatcher = useDispatch();

  if (currentPersonId === undefined) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              You need to sign in or sign up
            </MDTypography>
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }

  useEffect(() => {
    getAllTopic(currentPersonId);
  }, []);

  const getAllTopic = async (personId) => {
    const data = {
      'person_id': personId
    }

    // matching API of Spring
    // const response = await axios.get('http://localhost:8080/todo/getAllTopicOfPerson', { params: data });
    // setTopicList(response.data);
    // console.log("Run getAllTopic: DONE");
    // console.log(topicList);

    // matching API of Django
    const response = await axios.get('http://localhost:8000/todo/getAllTopicOfPerson', { params: data });
    if (response.data.status === "OK") {
      dispatcher(setCurrentTopicList(response.data.topicList));
    }
  }

  const onNewTopicName = (e) => setNewTopicName(e.target.value);
  const handleClose = () => setControl(false);
  const onChangeControl = () => setControl(true);

  const onCreateNewTopic = async () => {
    setControl(false);
    setNewTopicName("");
    const data = {
      'topicTitle': newTopicName,
      'person_id': currentPersonId
    }
    const res = await axios.post('http://localhost:8000/todo/createNewTopic', data);
    if (res.data.status === "OK") {
      dispatcher(setCurrentTopicList([...topicList, res.data.topic]));
    }
  }

  return (
    <>
      {/* PART 1+2: LIST ALL TOPICS */}
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              My Topics
            </MDTypography>

            {/* <MDBox mb={5}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox> mb: khoang cach so voi le duoi*/}
          </MDBox>

          <MDBox p={2}>
            <Grid container spacing={6}>

              {topicList.map((topic) => {
                let tmp = `Done: ${topic.solvedTaskNum}/${topic.totalTaskNum}`;
                return (
                  <Grid item xs={12} md={6} xl={3} key={topic.topic_id}>
                    {/* <Grid item xs={12} md={6} xl={3} key={topic.topicId}> */}
                    <DefaultProjectCard
                      topic_id = {topic.topic_id}
                      image={homeDecor1}
                      label=""
                      title={topic.topicTitle}
                      description={tmp}
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view topic",
                      }}
                    />
                  </Grid>
                );
              })}

              <Grid item xs={12} md={6} xl={3}>
                <Button onClick={onChangeControl}>
                  <PlaceholderCard
                    title={{ variant: "h5", text: "New topic" }}
                    outlined
                  />
                </Button>
              </Grid>

            </Grid>
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>

      {/* PART 3: DIALOG */}
      <Dialog open={control} onClose={handleClose}>
        <DialogTitle>
          <MDTypography
            variant="h6"
            fontWeight="bold"
            color="info"
            align="center"
          >
            Enter new Topic name
          </MDTypography>
        </DialogTitle>

        <DialogContent>
          <MDInput
            label="Topic Name"
            type="text"
            fullWidth
            variant="standard"
            value={newTopicName}
            onChange={onNewTopicName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={onCreateNewTopic} >Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Overview;
