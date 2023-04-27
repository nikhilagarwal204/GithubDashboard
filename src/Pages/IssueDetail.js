import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_OWNER}/${process.env.REACT_APP_GITHUB_REPO}/issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      )
      .then((response) => setIssue(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2em", paddingTop:"2px" }}>
      <h1 style={{ color: "#abdbe3" }}>{issue.title}</h1>
      <br />
      <p style={{ color: "#50bdda" }}>
        <ReactMarkdown remarkPlugins={[gfm]}>{issue.body}</ReactMarkdown>
      </p>
    </div>
  );
}

export default IssueDetail;
