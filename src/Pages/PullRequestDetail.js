import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function PullRequestDetail() {
  const { id } = useParams();
  const [pullRequest, setPullRequest] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_OWNER}/${process.env.REACT_APP_GITHUB_REPO}/pulls/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      )
      .then((response) => setPullRequest(response.data))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_OWNER}/${process.env.REACT_APP_GITHUB_REPO}/issues/${id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      )
      .then((response) => setComments(response.data.slice(0, 5)))
      .catch((error) => console.log(error));
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
      <br />
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
