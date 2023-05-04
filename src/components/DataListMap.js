import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

function DataListMap(props) {
  return (
    <List>
      {props.data.map((val) => (
        <ListItem key={val.id}>
          <ListItemText
            primary={
              <Link
                style={{ color: "#f5f2ef", textDecoration: "none" }}
                to={`/${props.linkTo}/${val.number}`}
              >
                {val.title}
              </Link>
            }
            secondary={
              <span
                style={{ color: "#6ccde1" }}
              >{`#${val.number} opened by ${val.user.login}`}</span>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default DataListMap;
