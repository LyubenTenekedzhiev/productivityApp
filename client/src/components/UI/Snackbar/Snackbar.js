import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function TransitionsSnackbar({ handleClose, transition, open }) {
  return (
    <div>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={2000} TransitionComponent={transition} message='Successfully added!' />
    </div>
  );
}
