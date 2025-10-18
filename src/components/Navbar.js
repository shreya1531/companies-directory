import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navbar({ search, setSearch, darkMode, setDarkMode }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: darkMode ? "#1e1e2f" : "#3f51b5",
        color: "white",
        mb: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
           Companies Directory
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 2,
            px: 1,
            mr: 2,
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search companies..."
            sx={{ ml: 1, color: "white" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <IconButton
          color="inherit"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
