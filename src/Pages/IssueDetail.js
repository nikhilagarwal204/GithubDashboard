import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import fetchData from "../utils";

function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetchData(`issues/${id}`).then((res) => setIssue(res));
  }, [id]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2em", paddingTop: "2px" }}>
      <h1 style={{ color: "#abdbe3" }}>{issue.title}</h1>
      <br />
      <p style={{ color: "#50bdda" }}>
        <ReactMarkdown remarkPlugins={[gfm]}>{issue.body}</ReactMarkdown>
      </p>
    </div>
  );
}

export default IssueDetail;
