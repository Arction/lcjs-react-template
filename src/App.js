import logo from "./logo.svg";
import "./App.css";
import { MyChartComponent } from "./Components/MyChartComponent";
import { LCHost } from "./LC";

const genRandomData = () => {
  const data = [];
  let prev = 0;
  for (let i = 0; i < 100_000; i += 1) {
    const y = prev + (Math.random() * 2 - 1);
    data.push(y);
    prev = y;
  }
  return data;
};

function App() {
  const data1 = genRandomData();
  const data2 = genRandomData();
  return (
    // NOTE: LCHost should be defined at the top of component tree, before any and all LCJS based components
    // This let's them share the same LC context for performance benefits.
    <LCHost>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="chart">
            <MyChartComponent id="chart-1" data={data1} />
          </div>
          <div className="chart">
            <MyChartComponent id="chart-2" data={data2} />
          </div>
        </header>
      </div>
    </LCHost>
  );
}

export default App;
