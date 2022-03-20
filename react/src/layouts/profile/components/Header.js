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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { useSelector } from "react-redux";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const person = useSelector((state) => (state).person)

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <>
      <MDBox position="relative" mb={5}>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
        <Card
          sx={{
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {person.fullname}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  {person.email}
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                  aria-label="disabled tabs example"
                >

                  <MDButton
                    variant="outlined"
                    color="info"
                  >
                    <Icon fontSize="small"> settings </Icon>&nbsp;
                    change avatar
                  </MDButton>

                  <MDButton
                    variant="outlined"
                    color="info"
                  >
                    <Icon fontSize="small" > settings </Icon>&nbsp;
                    change password
                  </MDButton>

                </Tabs>
              </AppBar>
            </Grid>
          </Grid>
          {children}
        </Card >
      </MDBox >

      <Dialog
        open={false}
      // onClose={handleClose}
      >
        <DialogTitle>
          <MDTypography
            variant="h6"
            fontWeight="bold"
            color="info"
            align="center"
          >
            Input Old Password and New Pasword
          </MDTypography>
        </DialogTitle>

        <DialogContent>
          <MDInput
            label="Old password"
            type="password"
            fullWidth
            variant="standard"
          // value={newTopicName}
          // onChange={onNewTopicName}
          />

          <br/><br/>
          <MDInput
            label="New password"
            type="password"
            fullWidth
            variant="standard"
          // value={newTopicName}
          // onChange={onNewTopicName}
          />
        </DialogContent>
        <DialogActions>
          <MDButton
          // onClick={handleClose}
          >Cancel
          </MDButton>
          <MDButton
            // onClick={onCreateNewTopic}
          >Submit
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
