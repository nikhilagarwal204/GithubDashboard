import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import DataListMap from "../components/DataListMap";
import PaginationBox from "../components/PaginationBox";
import fetchData from "../utils";

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState(null);
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
    fetchData(`pulls?per_page=5&page=${page}&state=all&sort=${popularitySort}&direction=desc`).then((res) => setPullRequests(res));
    fetchData(`pulls?per_page=10000`).then((res) => setTotalCount(res.length));
  }, [page, popularitySort]);

  const fetchPullRequestsFilter = async () => {
    fetchData(`pulls?per_page=5&page=${page}&state=${statusFilter.toLowerCase()}&sort=${popularitySort}&direction=desc`).then((res) => setPullRequests(res));
  };

  if (!pullRequests) {
    return <div>Loading...</div>;
  }

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
        <InputLabel style={{ color: "azure", marginLeft: "5em" }}>
          SORT by:
        </InputLabel>
        <Select
          style={{ background: "white", width: "10%", height: "45px" }}
          value={popularitySort}
          onChange={handlePopularitySortChange}
        >
          <MenuItem value="created">Newest</MenuItem>
          <MenuItem value="updated">Updated</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
        </Select>
      </Box>

      <DataListMap data={pullRequests} linkTo="pulls" />

      {pullRequests.length !== 0 ? (
        <PaginationBox
          totalCount={totalCount}
          page={page}
          handlePageChange={handlePageChange}
        />
      ) : (
        <div style={{ color: "red" }}>
          No Pull Requests Found with these Filters
        </div>
      )}
    </div>
  );
};

export default PullRequestList;
