import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handleLabelFilterChange = (event) => {
    setLabelFilter(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const vlabels = await axios.get(
          `https://api.github.com/repos/facebook/react/labels`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        setLabels(vlabels.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLabels();
  }, []);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/facebook/react/issues?per_page=5&page=${page}&state=${statusFilter}&labels=${labelFilter}&direction=desc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        setIssues(response.data);
        const tcount = await axios.get(
          `https://api.github.com/repos/facebook/react/issues?per_page=10000&state=${statusFilter}&labels=${labelFilter}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        setTotalCount(tcount.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssues();
    // eslint-disable-next-line
  }, [page, statusFilter, labelFilter]);

  return (
    <div style={{ padding: "2em", color: "white", paddingTop: "2px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Issues
      </Typography>

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5em",
          marginBottom: "2em",
        }}
      >
        <InputLabel style={{ color: "azure" }}>FILTER by STATE:</InputLabel>
        <Select
          style={{
            background: "white",
            width: "8%",
            marginRight: "4em",
            height: "45px"
          }}
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>

        <InputLabel style={{ color: "azure" }}>FILTER by LABEL:</InputLabel>
        <Select
          multiple
          style={{ background: "white", width: "15%", height: "45px" }}
          value={labelFilter}
          onChange={handleLabelFilterChange}
        >
          {labels.map((label) => (
            <MenuItem value={label.name}>{label.name}</MenuItem>
          ))}
        </Select>
      </Box>

      <Grid>
        {issues.map((issue) => (
          <Grid item xs={12} key={issue.id}>
            <List>
              <ListItem key={issue.id}>
                <ListItemText
                  primary={
                    <Link
                      style={{ color: "#f5f2ef", textDecoration: "none" }}
                      to={`/pulls/${issue.number}`}
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
            </List>
          </Grid>
        ))}
      </Grid>
      {issues.length !== 0 ? (
        <Box
          style={{
            margin: "3em",
            display: "flex",
          }}
        >
          <Pagination
            style={{ background: "white" }}
            count={Math.ceil(totalCount / 5)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      ) : (
        <div style={{ color: "red" }}>No Issues Found with these Filters</div>
      )}
    </div>
  );
};

export default IssueList;
