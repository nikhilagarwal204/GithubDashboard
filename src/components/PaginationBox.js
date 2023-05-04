import React from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function PaginationBox(props) {
  return (
    <Box
      style={{
        margin: "2em",
        display: "flex",
      }}
    >
      <Pagination
        style={{ background: "white" }}
        count={Math.ceil(props.totalCount / 5)}
        page={props.page}
        onChange={props.handlePageChange}
      />
    </Box>
  );
}

export default PaginationBox;
