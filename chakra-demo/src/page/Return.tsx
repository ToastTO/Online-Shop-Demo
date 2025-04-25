import { useState, useEffect } from "react";
import ReturnSuccess from "./ReturnSuccess";
import ReturnFail from "./ReturnFail";

const Return = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    console.log(queryString, urlParams, sessionId);

    fetch(`api/product/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      });
  }, []);
  return (
    <>
      {/* <h1>Return Page</h1> */}
      {status === "complete" ? <ReturnSuccess /> : <ReturnFail />}
    </>
  );
};

export default Return;
