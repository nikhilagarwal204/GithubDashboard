import { useState, useEffect } from "react";
import { Box, Typography, MenuItem, Select, InputLabel } from "@mui/material";
import DataListMap from "../components/DataListMap";
import PaginationBox from "../components/PaginationBox";
import fetchData from "../utils";

const IssueList = () => {
  const [issues, setIssues] = useState(null);
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
    fetchData(`labels`).then((res) => setLabels(res));
  }, []);

  useEffect(() => {
    fetchData(`issues?per_page=5&page=${page}&state=${statusFilter}&labels=${labelFilter}&direction=desc`).then((res) => setIssues(res));
    fetchData(`issues?per_page=10000&state=${statusFilter}&labels=${labelFilter}`).then((res) => setTotalCount(res.length));
    // eslint-disable-next-line
  }, [page, statusFilter, labelFilter]);

  if (!issues) {
    return <div>Loading...</div>;
  }

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
            height: "45px",
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

      <DataListMap data={issues} linkTo="issues" />

      {issues.length !== 0 ? (
        <PaginationBox
          totalCount={totalCount}
          page={page}
          handlePageChange={handlePageChange}
        />
      ) : (
        <div style={{ color: "red" }}>No Issues Found with these Filters</div>
      )}
    </div>
  );
};

export default IssueList;
