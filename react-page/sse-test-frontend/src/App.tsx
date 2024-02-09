import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/stream2");
    eventSource.onmessage = (({ data }) => {
      console.log({ data });
    });
  }, []);
  return <div className="App">hello!!!</div>;
}

export default App;
