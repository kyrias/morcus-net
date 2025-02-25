import React, { useState } from "react";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Solarized } from "@/web/client/colors";
import { callApi } from "@/web/utils/rpc/client_rpc";
import { MacronizeApi } from "@/web/api_routes";

export function Macronizer() {
  const [rawInput, setRawInput] = useState<string | undefined>(undefined);
  const [processed, setProcessed] = useState<string | undefined>(undefined);

  async function handleClick() {
    if (rawInput === undefined) {
      return;
    }
    try {
      setProcessed(await callApi(MacronizeApi, rawInput));
    } catch (e) {
      setProcessed("Error: please try again later.");
      console.debug(e);
    }
  }

  return (
    <>
      <Box
        sx={{
          padding: 3,
          ml: 3,
          mr: 3,
          mt: 3,
          mb: 3,
          border: 2,
          borderRadius: 1,
          borderColor: Solarized.base2,
        }}
      >
        <TextField
          label="Enter text to macronize"
          multiline
          fullWidth
          minRows={10}
          variant="filled"
          inputProps={{ spellCheck: "false" }}
          InputLabelProps={{
            style: { color: Solarized.base1 },
          }}
          onChange={(e) => {
            setRawInput(e.target.value);
          }}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ mt: 2, color: Solarized.base00, display: "block" }}
        >
          {"Macronize"}
        </Button>
      </Box>
      {processed && (
        <Box
          sx={{
            padding: 3,
            ml: 3,
            mr: 3,
            mt: 3,
            mb: 3,
            border: 2,
            borderRadius: 1,
            borderColor: Solarized.base2,
          }}
        >
          <div style={{ whiteSpace: "pre-wrap" }}>{processed}</div>
        </Box>
      )}
    </>
  );
}
