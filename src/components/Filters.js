import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Filters({ search, setSearch, location, setLocation, industry, setIndustry, locations, industries }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      <TextField 
        label="Search by Name"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
        >
          <MenuItem value="">All</MenuItem>
          {locations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Industry</InputLabel>
        <Select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          label="Industry"
        >
          <MenuItem value="">All</MenuItem>
          {industries.map(ind => <MenuItem key={ind} value={ind}>{ind}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}
