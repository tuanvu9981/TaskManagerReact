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
import { Link } from "react-router-dom";
import { setCurrentTopicList } from "../../../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { personIdSelector } from "redux/selectors";
import axios from "axios";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function DefaultProjectCard({ image, label, title, description, action, authors, topic_id }) {

  const [controlDel, setControlDel] = useState(false);
  const personId = useSelector(personIdSelector);
  const currentTopicList = useSelector((state) => state.topicList);
  const dispatcher = useDispatch();

  const handleCloseDelete = () => setControlDel(false);
  const onClickDel = () => setControlDel(true);

  const onDeleteTopic = async () => {
    setControlDel(false);
    const data = {
      'person_id': personId,
      'topic_id': topic_id
    }

    const response = await axios.put('http://localhost:8000/todo/deleteOneTopic', data);
    if (response.data.status === "OK") {
      const newTopicList = currentTopicList.filter((topic) => { 
        return topic.topic_id !== data.topic_id 
      });

      dispatcher(setCurrentTopicList(newTopicList));
    }
  }

  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
        }}
      >

        <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
          <CardMedia
            src={image}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </MDBox>

        <MDBox mt={1} mx={0.5}>

          <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
            {label}
          </MDTypography>

          <MDBox mb={1}>
            {action.type === "internal" ? (
              <MDTypography
                component={Link}
                to={action.route}
                variant="h5"
                textTransform="capitalize"
              >
                {title}
              </MDTypography>
            ) : (
              <MDTypography
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="h5"
                textTransform="capitalize"
              >
                {title}
              </MDTypography>
            )}
          </MDBox>

          <MDBox mb={3} lineHeight={0}>
            <MDTypography variant="h6" fontWeight="bold" color="info">
              {description}
            </MDTypography>
          </MDBox>

          <MDBox md={3} display="flex" justifyContent="space-between" alignItems="center">
            {action.type === "internal" ? (
              <>
                <MDButton
                  component={Link}
                  to={action.route}
                  variant="outlined"
                  size="small"
                  color="info"
                >
                  View Topic
                </MDButton>

                <MDButton
                  // component={Link}
                  // to={action.route}
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={onClickDel}
                >
                  Delete
                </MDButton>
              </>
            ) : (
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                color={action.color}
              >
                {action.label}
              </MDButton>

            )}
            {/* <MDBox display="flex">{renderAuthors}</MDBox> */}
          </MDBox>

        </MDBox>
      </Card>

      <Dialog open={controlDel} onClose={handleCloseDelete}>
        <DialogTitle>
          <MDTypography
            variant="h6"
            fontWeight="bold"
            color="info"
            align="center"
          >
            Are you sure to delete ?
          </MDTypography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete} >Cancel</Button>
          <Button onClick={onDeleteTopic} >Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
