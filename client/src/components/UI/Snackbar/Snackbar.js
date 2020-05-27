import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

import "./Snackbar.css";

export default function TransitionsSnackbar({ handleClose, transition, open }) {
  return (
    <div>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={1000} TransitionComponent={transition} message='Successfully added!' />
    </div>
  );
}
