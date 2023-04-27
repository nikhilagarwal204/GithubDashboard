import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import PullRequestList from "./Pages/PullRequestList";
import IssueList from "./Pages/IssueList";
import PullRequestDetail from "./Pages/PullRequestDetail";
import IssueDetail from "./Pages/IssueDetail";
import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <h2 style={{ paddingLeft: "20px", cursor:"pointer" }}>🏠</h2>
        </Link>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/pulls" element={<PullRequestList />} />
          <Route exact path="/issues" element={<IssueList />} />
          <Route path="/pulls/:id" element={<PullRequestDetail />} />
          <Route path="/issues/:id" element={<IssueDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
