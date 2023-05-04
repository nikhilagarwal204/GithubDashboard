import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import fetchData from "../utils";

function PullRequestDetail() {
  const { id } = useParams();
  const [pullRequest, setPullRequest] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData(`pulls/${id}`).then((res) => setPullRequest(res));
    fetchData(`issues/${id}/comments`).then((res) => setComments(res.slice(0, 5)));
  }, [id]);

  if (!pullRequest) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2em", paddingTop:"2px" }}>
      <h1 style={{ color: "#abdbe3" }}>{pullRequest.title}</h1>
      <br />
      <p style={{ color: "#50bdda" }}>
        <ReactMarkdown remarkPlugins={[gfm]}>{pullRequest.body}</ReactMarkdown>
      </p>
      <br/>
      {comments.length!==0 ? <h2 style={{ color: "#4343e5" }}>Comments:</h2> : <h2 style={{ color: "#4343e5" }}>No Comments yet</h2>}
      <ul>
        {comments.map((comment) => (
          <div>
            <div
              style={{ border: "1px white solid", padding: "10px" }}
              key={comment.id}
            >
              <ReactMarkdown remarkPlugins={[gfm]}>
                {comment.body}
              </ReactMarkdown>
            </div>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default PullRequestDetail;
