import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Box my={2} />

    <Container maxWidth="md">{children}</Container>
  </>
);

export default MainLayout;
