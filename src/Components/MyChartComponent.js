import { Themes } from "@arction/lcjs";
import React, { useEffect, useState, useContext } from "react";
import { LCContext } from "../LC";

const MyChartComponent = (props) => {
  const { id, data } = props;
  const lc = useContext(LCContext);
  const [charts, setCharts] = useState(undefined);

  useEffect(() => {
    const container = document.getElementById(id);
    if (!container || !lc) {
      return;
    }
    const chart = lc.ChartXY({
      theme: Themes.darkGold,
      container,
    });
    const lineSeries = chart.addLineSeries({
      dataPattern: { pattern: "ProgressiveX" },
    });
    setCharts({ chart, lineSeries });
    return () => {
      chart.dispose();
    };
  }, [id, lc]);

  useEffect(() => {
    if (!charts || !data) {
      return;
    }
    charts.lineSeries.clear().addArrayY(data);
  }, [charts, data]);

  return <div id={id} style={{ width: "100%", height: "100%" }}></div>;
};

export default MyChartComponent;
