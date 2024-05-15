import { Themes, ChartXY, PointLineAreaSeries, emptyFill } from "@arction/lcjs";
import { useEffect, useState, useContext, useId } from "react";
import { LCContext } from "../LC";

export function MyChartComponent(props: { data: number[] }) {
  const { data } = props;
  const id = useId();
  const lc = useContext(LCContext);
  const [chartState, setChartState] = useState<{
    chart: ChartXY;
    lineSeries: PointLineAreaSeries;
  }>();

  useEffect(() => {
    const container = document.getElementById(id) as HTMLDivElement;
    if (!container || !lc) {
      return;
    }
    const chart = lc.ChartXY({
      theme: Themes.light,
      container,
    });
    const lineSeries = chart
      .addPointLineAreaSeries({
        dataPattern: "ProgressiveX",
      })
      .setAreaFillStyle(emptyFill);
    setChartState({ chart, lineSeries });
    return () => {
      chart.dispose();
    };
  }, [id, lc]);

  useEffect(() => {
    if (!chartState || !data || chartState.chart.isDisposed()) {
      return;
    }
    chartState.lineSeries.setSamples({ yValues: data });
  }, [chartState, data]);

  return <div id={id} className="chart"></div>;
}
