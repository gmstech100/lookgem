import React, { useState } from "react";
import {Dialog, DialogTitle, DialogContent, Button, DialogActions} from "@mui/material";

const PinkGemsListedInsert = (props) => {

  const {
    openInsert,
    setOpenInsert,
  } = props;

  const [open, setOpen] = useState(openInsert);

  const handleClose = () => {
    setOpenInsert(false);
  };

  const handleSubmit = () => {
    setOpenInsert(false);
  };

  return (
    <div>
      {openInsert && (
        <Dialog open={open} maxWidth="md">
          <DialogTitle
            sx={{
              backgroundColor: "rgba(235,235,235,0.7)",
            }}
          >
            Add New Pink Gem
          </DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              //disabled={Object.values(error).some((value) => value === true)}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
        )}
    </div>
  );
};

export default PinkGemsListedInsert;
