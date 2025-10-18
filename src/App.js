import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyCard from "./components/CompanyCard";
import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get("/companies.json")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = companies
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (location ? c.location === location : true))
    .filter((c) => (industry ? c.industry === industry : true))
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const locations = [...new Set(companies.map((c) => c.location))];
  const industries = [...new Set(companies.map((c) => c.industry))];

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#3f51b5",
      },
      background: {
        default: darkMode ? "#121212" : "#f0f4ff",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  if (loading)
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 10, color: "text.secondary" }}
      >
        Loading company data...
      </Typography>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Box sx={{ py: 4 }}>
        <Container>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: "16px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Filters
              search={search}
              setSearch={setSearch}
              location={location}
              setLocation={setLocation}
              industry={industry}
              setIndustry={setIndustry}
              locations={locations}
              industries={industries}
            />
            <Button
              variant="contained"
              startIcon={<SortIcon />}
              onClick={() => setSortAsc(!sortAsc)}
              sx={{
                mt: 2,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Sort by Name {sortAsc ? "↑" : "↓"}
            </Button>
          </Paper>

          <Grid container spacing={3}>
            {displayed.map((c) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>
                <CompanyCard company={c} />
              </Grid>
            ))}
          </Grid>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>

            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Page {currentPage} of {totalPages}
            </Typography>

            <Button
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
