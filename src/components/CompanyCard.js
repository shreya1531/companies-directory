import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

export default function CompanyCard({ company }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // Access current theme (light/dark)

  return (
    <>
      <Card
        sx={{
          borderRadius: "20px",
          background:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 16px rgba(0,0,0,0.5)"
              : "0 8px 16px rgba(0,0,0,0.15)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px) scale(1.02)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 16px 32px rgba(0,0,0,0.7)"
                : "0 16px 32px rgba(0,0,0,0.25)",
          },
          color: theme.palette.text.primary,
        }}
      >
        <CardActionArea onClick={() => setOpen(true)}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1}>
              <BusinessIcon sx={{ color: theme.palette.primary.main }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", letterSpacing: "0.3px", color: theme.palette.text.primary }}
              >
                {company.name}
              </Typography>
            </Box>

            <Typography sx={{ mt: 1, color: theme.palette.text.secondary }}>
              🌍 <b>Location:</b> {company.location}
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              🏭 <b>Industry:</b> {company.industry}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* View Details Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[12],
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          {company.name}
        </DialogTitle>

        <DialogContent dividers>
          <Typography sx={{ mb: 1 }}>
            <strong>Industry:</strong> {company.industry}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Location:</strong> {company.location}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Website:</strong>{" "}
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.palette.primary.main, textDecoration: "none" }}
            >
              {company.website || "N/A"}
            </a>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Description:</strong> {company.description || "No description available."}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
          {company.website && (
            <Button
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
            >
              Visit Site
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
