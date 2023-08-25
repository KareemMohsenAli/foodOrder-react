import React from "react";

export default function Movie({ title, release_date,opening_crawl }) {
  console.log(title);
  return (
    <div className="card w-100 h-100">
      <h1>{title}</h1>
      <p>{opening_crawl}</p>
      <small>{release_date}</small>
    </div>
  );
}
