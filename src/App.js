import logo from "./logo.svg";
import "./App.css";
import { MyChartComponent } from "./Components/MyChartComponent";
import { LCHost } from "./LC";
import { useState } from "react";

const genRandomData = () => {
  const data = [];
  let prev = 0;
  for (let i = 0; i < 10; i += 1) {
    const y = prev + (Math.random() * 2 - 1);
    data.push(y);
    prev = y;
  }
  return data;
};

function App() {
  const [showChart, setShowChart] = useState(true);
  const data = genRandomData();

  const handleShowChart = () => {
    setShowChart(!showChart);
  };

  return (
    // NOTE: LCHost should be defined at the top of component tree, before any and all LCJS based components
    // This let's them share the same LC context for performance benefits.
    <>
      <LCHost>
        <div>LCJS Host</div>
        <button onClick={handleShowChart}>Button</button>
        {showChart && <MyChartComponent data={data} />}
      </LCHost>
    </>
  );
}

export default App;
