import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [popularitySort, setPopularitySort] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handlePopularitySortChange = (event) => {
    setPopularitySort(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/facebook/react/pulls?per_page=5&page=${page}&state=all&sort=${popularitySort}&direction=desc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          }
        );
        setPullRequests(response.data);
        const tcount = await axios.get(
          `https://api.github.com/repos/facebook/react/pulls?per_page=10000`,
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

    fetchPullRequests();
  }, [page, popularitySort]);

  const fetchPullRequestsFilter = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react/pulls?per_page=5&page=${page}&state=${statusFilter.toLowerCase()}&sort=${popularitySort}&direction=desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );
      setPullRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "2em", color: "white", paddingTop: "2px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Pull Requests
      </Typography>

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5em",
          marginBottom: "2em",
        }}
      >
        <TextField
          style={{ background: "white", borderRadius: "5px" }}
          color="secondary"
          variant="outlined"
          size="small"
          placeholder="'open' / 'closed' / 'all'"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        />
        <Button variant="contained" onClick={fetchPullRequestsFilter}>
          FILTER
        </Button>
        <InputLabel style={{ color: "azure", marginLeft: "5em" }}>SORT by:</InputLabel>
        <Select
          style={{ background: "white", width: "10%", height:"45px" }}
          value={popularitySort}
          onChange={handlePopularitySortChange}
        >
          <MenuItem value="created">Newest</MenuItem>
          <MenuItem value="updated">Updated</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
        </Select>
      </Box>

      <Grid>
        {pullRequests.map((pullRequest) => (
          <Grid item xs={12} key={pullRequest.id}>
            <List>
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
            </List>
          </Grid>
        ))}
      </Grid>

      <Box
        style={{
          margin: "2em",
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
    </div>
  );
};

export default PullRequestList;
