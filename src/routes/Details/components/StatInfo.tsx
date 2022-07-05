import { Box, SvgIcon, Tooltip } from "@mui/material";
import React from "react";

type StatInfoProps = {
  Icon: typeof SvgIcon;
  title: string;
  // eslint-disable-next-line react/require-default-props
  label?: React.ReactNode;
};

const StatInfo: React.FC<StatInfoProps> = ({ label, title, Icon }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      rowGap: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Tooltip title={title} placement="top">
      <div>
        <Icon sx={{ fontSize: 72, color: "primary.main" }} />
      </div>
    </Tooltip>
    <div>{label}</div>
  </Box>
);

export default StatInfo;
