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

import { useState } from "react";
import axios from "axios";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    // bgColor: "transparent",
    // color: "dark",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };

  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [state, setState] = useState({
    "username": "",
    "password": ""
  })

  const [errMessage, setErrMessage] = useState("");
  const [openOK, setOpenOK] = useState(false);
  const [openERR, setOpenERR] = useState(false);

  const handleInput = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const navigator = useNavigate();
  const handleCloseOK = () => {
    setOpenOK(false);
    navigator("http://localhost:3000/profile");
  }

  const handleCloseERR = () => {
    setOpenERR(false);
  }

  const signIn = async () => {
    const data = {
      "username": state.username,
      "password": state.password
    }

    const response = await axios.post('http://127.0.0.1:8000/todo/signIn', data)
    if (response.data.status === "OK") {
      setOpenOK(true);
    } else {
      setOpenERR(true);
      setErrMessage(response.data.message);
    }
  }

  return (
    <>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>

            <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>

              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <FacebookIcon color="inherit" />
                </MDTypography>
              </Grid>

              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <GitHubIcon color="inherit" />
                </MDTypography>
              </Grid>

              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <GoogleIcon color="inherit" />
                </MDTypography>
              </Grid>

            </Grid>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">

              <MDBox mb={2}>
                <MDInput
                  name="username"
                  type="username"
                  label="UserName"
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
                  fullWidth
                  value={state.password}
                  onChange={handleInput}
                />
              </MDBox>

              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={signIn}
                >
                  sign in
                </MDButton>
              </MDBox>

              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>

            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>

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
            component="h4"
            color="success"
            textAlign="center"
          >
            Welcome back to TaskManager
            <br/><br />
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
            variant="h5"
            component="h2"
          >
            {errMessage}
            <br /><br />
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

export default Basic;
