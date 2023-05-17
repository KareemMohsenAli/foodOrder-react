import React, { useEffect, useState } from "react";
import classes from "./user.css";

export default function AddMovie({ onSaveData }) {
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [release, setRelease] = useState("");
  const dateChangeHandler=(e)=>{
    setRelease(e.target.value);

  }
  const titleChangeHandler = (e) => {
    settitle(e.target.value);
  };
  const textChangeHandler = (e) => {
    settext(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    settitle("");
    settext("");
    setRelease("");
    const data = {
      title: title,
      text: text,
    release: release,
    };
    onSaveData(data);
  };

  return (
    <div>
      <div className=" text-center mt-2 d-flex justify-content-center">
        <form className="w-25" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              value={title}
              onChange={titleChangeHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputage1" className="form-label">
              Opening Test
            </label>
            <textarea
              value={text}
              onChange={textChangeHandler}
              className="form-control"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputage1" className="form-label">
              Relase Date
            </label>
            <input
              value={release}
              onChange={dateChangeHandler}
              type="date"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Moview
          </button>
        </form>
      </div>
    </div>
  );
}
