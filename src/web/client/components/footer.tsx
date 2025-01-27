import * as React from "react";

import { Box, Typography } from "@mui/material";
import { Solarized } from "@/web/client/colors";
import { SelfLink } from "@/web/client/components/misc";

export function Footer(props: { id?: string; className?: string }) {
  return (
    <Box padding="2em" id={props.id} className={props.className}>
      <Typography
        component={"div"}
        style={{ marginTop: window.innerHeight, color: Solarized.base02 }}
        fontSize={12}
      >
        <p>
          This program is free software: you can redistribute it and/or modify
          it under the terms of the GNU Affero General Public License as
          published by the Free Software Foundation, either version 3 of the
          License, or (at your option) any later version.
        </p>
        <p>
          This program is distributed in the hope that it will be useful, but
          WITHOUT ANY WARRANTY; without even the implied warranty of
          MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
          Affero General Public License for more details.
        </p>
        See <SelfLink to="https://www.gnu.org/licenses/agpl-3.0.en.html" />
        for a copy of the GNU Affero General Public License.
      </Typography>
    </Box>
  );
}
