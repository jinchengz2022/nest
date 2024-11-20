import React, { useEffect } from "react";

import { VirtualizedList } from "./virtual-list/index";

function App() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/stream2");
    eventSource.onmessage = ({ data }) => {
      console.log({ data });
    };
  }, []);
  return (
    <div className="App">
      <VirtualizedList />
    </div>
  );
}

export default App;
