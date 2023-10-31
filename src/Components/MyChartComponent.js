import { Themes } from "@arction/lcjs";
import { useEffect, useState, useContext, useRef } from "react";
import { LCContext } from "../LC";

export function MyChartComponent(props) {
  const { id, data } = props;
  const lc = useContext(LCContext);
  const [charts, setCharts] = useState(undefined);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container || !lc) {
      return;
    }
    let chart;
    try {
      chart = lc.ChartXY({
        theme: Themes.light,
        container,
      });
      const lineSeries = chart.addLineSeries({
        dataPattern: { pattern: "ProgressiveX" },
      });
      setCharts({ chart, lineSeries });
    } catch (e) {
      console.error(e);
    }
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [id, lc, canvasRef]);

  useEffect(() => {
    if (!charts || !data) {
      return;
    }
    charts.lineSeries.clear().addArrayY(data);
  }, [charts, data]);

  return <div ref={canvasRef} className="chart"></div>;
}
