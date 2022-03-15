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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // bgColor: "transparent",
    // color: "dark",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };

  const [state, setState] = useState(
    {
      "fullname": "",
      "username": "",
      "password": "",
      "confirmPassword": ""
    }
  )

  const [errMessage, setErrMessage] = useState("");
  const navigator = useNavigate();
  const [openOK, setOpenOK] = useState(false);
  const [openERR, setOpenERR] = useState(false);

  const handleCloseOK = () => {
    setOpenOK(false);
    navigator("http://localhost:3000/profile");
  }

  const handleCloseERR = () => {
    setOpenERR(false);
  }

  const handleInput = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const preSignUp = async () => {
    if (state.password !== state.confirmPassword) {
      setErrMessage("Password & ConfirmPassword is not the same!")
      setOpenERR(true);
    }
    else {
      console.log(state)
      signUp();
    }
  }

  const signUp = async () => {
    const data = {
      "username": state.username,
      "fullname": state.fullname,
      "password": state.password
    }

    const response = await axios.post('http://127.0.0.1:8000/todo/signUp', data);
    // console.log(response.data)

    if (response.data.status === "OK") {
      // console.log(response.data)
      setOpenOK(true);

      setState({
        "fullname": "",
        "username": "",
        "password": "",
        "confirmPassword": ""
      })
    } else if (response.data.status === "ERROR") {
      // console.log(response.data)
      setOpenERR(true);
      setErrMessage("Error happened !")
    } else if (response.data.status === "ERROR_DUP"){
      setOpenERR(true);
      setErrMessage(response.data.message);
    }
  }

  return (
    <>
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>

            <MDTypography display="block" variant="button" color="white" my={1}>
              Register here
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">

              <MDBox mb={3}>
                <MDInput
                  type="text"
                  label="Full Name"
                  variant="standard"
                  fullWidth
                  name="fullname"
                  value={state.fullname}
                  onChange={handleInput}
                />
              </MDBox>

              <MDBox mb={3}>
                <MDInput
                  name="username"
                  type="text"
                  label="User Name"
                  variant="standard"
                  fullWidth
                  value={state.username}
                  onChange={handleInput}
                />
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  name="password"
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  value={state.password}
                  onChange={handleInput}
                />
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  name="confirmPassword"
                  type="password"
                  label="Confirm Your Password"
                  variant="standard"
                  fullWidth
                  value={state.confirmPassword}
                  onChange={handleInput}
                />
              </MDBox>

              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox />

                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>

                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={preSignUp}
                >
                  sign up
                </MDButton>
              </MDBox>

              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>

            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>

      {/* OK MODAL */}
      <Modal
        open={openOK}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <MDTypography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color="success"
            textAlign="center"
          >
            Welcome to TaskManager
          </MDTypography>

          <MDTypography
            id="modal-modal-description"
            sx={{ mt: 2, pd: 3 }}
            textAlign="center"
            variant="h6"
            component="h2"
          >
            Sign Up successfully !
            <br/><br/>
          </MDTypography>

          <MDButton
            onClick={handleCloseOK}
            variant="contained"
            color="info"
          >
            OK
          </MDButton>
        </Box>
      </Modal>

      {/* FAILURE MODAL */}
      <Modal
        open={openERR}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <MDTypography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color="error"
            textAlign="center"
          >
            Warning !
          </MDTypography>

          <MDTypography
            id="modal-modal-description"
            sx={{ mt: 2, pd: 3 }}
            textAlign="center"
            variant="h6"
            component="h2"
          >
            {errMessage}
            <br/><br/>
          </MDTypography>

          <MDButton
            onClick={handleCloseERR}
            variant="contained"
            color="info"
          >
            OK
          </MDButton>
        </Box>
      </Modal>

    </>
  );
}

export default Cover;
