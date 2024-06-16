import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

function BasicAlerts({ severity, message }) {
  const defaultMessages = {
    success: "This is a success Alert.",
    info: "This is an info Alert.",
    warning: "This is a warning Alert.",
    error: "This is an error Alert.",
  };

  return (
    <Stack sx={{ width: "100%"}} spacing={2}>
      <Alert severity={severity}>{message || defaultMessages[severity]}</Alert>
    </Stack>
  );
}

// Definimos las PropTypes
BasicAlerts.propTypes = {   
  severity: PropTypes.oneOf(["success", "info", "warning", "error"]).isRequired,
  message: PropTypes.string,
};

export default BasicAlerts;
