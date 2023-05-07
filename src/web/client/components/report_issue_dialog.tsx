import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Solarized } from "../colors";
import { backendCall } from "../browser_utils";
import { report } from "@/web/api_routes";

export function ReportIssueDialog(props: {
  show: boolean;
  onClose: () => any;
}) {
  const [reportText, setReportText] = React.useState<string>("");

  return (
    <Dialog
      open={props.show}
      onClose={props.onClose}
      PaperProps={{
        style: {
          backgroundColor: Solarized.base3,
        },
      }}
    >
      <DialogTitle style={{ fontSize: 19, lineHeight: "normal" }}>
        <b>Report an issue</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: 16, lineHeight: "normal" }}>
          What did you do, what did you expect to see, and what did you actually
          see? <i>Do not enter personal information</i>.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          onChange={(e) => {
            setReportText(e.target.value);
          }}
          defaultValue={`${window.location.href}\n`}
          fullWidth
          multiline
          minRows={8}
          variant="filled"
          inputProps={{ style: { fontSize: 16, lineHeight: "normal" } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} variant="text" color="info">
          Cancel
        </Button>
        <Button
          onClick={() => {
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "text/plain; charset=utf-8",
              },
              body: reportText,
            };
            backendCall(report(), options);
            props.onClose();
          }}
          variant="contained"
        >
          <b>Submit</b>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
