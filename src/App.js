import React from "react";
import { useFetch } from "./useFetch";

export function App() {
  const [response, status] = useFetch(
    "https://api.github.com/search/repositories?q=react"
  );

  return (
    <div className="App">
      <h1>
        React stars: {status === "DONE" ? response.total_count : "...loading"}
      </h1>
      <span>{status}</span>
    </div>
  );
}

