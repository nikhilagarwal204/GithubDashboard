import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function Dashboard() {
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_OWNER}/${process.env.REACT_APP_GITHUB_REPO}/pulls?per_page=5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      )
      .then((response) => setPullRequests(response.data))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_OWNER}/${process.env.REACT_APP_GITHUB_REPO}/issues?per_page=5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      )
      .then((response) => setIssues(response.data))
      .catch((error) => console.log(error));
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
            <List>
              {pullRequests.map((pullRequest) => (
                <ListItem key={pullRequest.id}>
                  <ListItemText
                    primary={
                      <Link
                        style={{ color: "#f5f2ef", textDecoration: "none" }}
                        to={`/pulls/${pullRequest.number}`}
                      >
                        {pullRequest.title}
                      </Link>
                    }
                    secondary={
                      <span
                        style={{ color: "#6ccde1" }}
                      >{`#${pullRequest.number} opened by ${pullRequest.user.login}`}</span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <br />
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
            <List>
              {issues.map((issue) => (
                <ListItem key={issue.id}>
                  <ListItemText
                    primary={
                      <Link
                        style={{ color: "#d6f1f0", textDecoration: "none" }}
                        to={`/issues/${issue.number}`}
                      >
                        {issue.title}
                      </Link>
                    }
                    secondary={
                      <span
                        style={{ color: "#6ccde1" }}
                      >{`#${issue.number} opened by ${issue.user.login}`}</span>
                    }
                  />
                </ListItem>
              ))}
            </List>
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
