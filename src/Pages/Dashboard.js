import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import DataListMap from "../components/DataListMap";
import fetchData from "../utils";

function Dashboard() {
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchData(`pulls?per_page=5`).then(res => setPullRequests(res));
    fetchData(`issues?per_page=5`).then(res => setIssues(res));
  }, []);

  return (
    <div style={{ padding: "3em", paddingTop:"2px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Exclusive GitHub Dashboard 🚀 &nbsp; for <a rel="noreferrer" target="_blank" href="https://github.com/facebook/react">facebook/react</a></Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Card
          sx={{
            width: "100%",
            maxWidth: "40rem",
            background: "#022b59",
            color: "#83d5e3",
          }}
        >
          <CardHeader title="Latest Pull Requests:" />
          <CardContent>
            <DataListMap data={pullRequests} linkTo="pulls"/>
          </CardContent>
          <Box sx={{ p: 2 }}>
            <Button
              style={{ background: "#4343e5", color: "pink" }}
              fullWidth
              component={Link}
              to="/pulls"
            >
              View All Pull Requests
            </Button>
          </Box>
        </Card>
        <Card
          sx={{
            width: "100%",
            maxWidth: "40rem",
            background: "#022b59",
            color: "#83d5e3",
          }}
        >
          <CardHeader title="Latest Issues:" />
          <CardContent>
            <DataListMap data={issues} linkTo="issues"/>
          </CardContent>
          <Box sx={{ p: 2 }}>
            <Button
              style={{ background: "#4343e5", color: "pink" }}
              fullWidth
              component={Link}
              to="/issues"
            >
              View All Issues
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default Dashboard;
