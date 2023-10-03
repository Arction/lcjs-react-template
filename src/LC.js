// React logic for managing LightningChart JS instances that are shared
// between any LCJS based components that can be visible at the same time
// In simple use cases with 1-2 charts visible at once, there is no need to use these.
// However, with more charts visible at once, this gives an incredible performance advantage, since all charts use a shared LC context.
// See usage example in ./Components/MyChartComponent.js and ./App.js

import { createContext, useEffect, useRef, useState } from "react";
import { lightningChart } from "@arction/lcjs";

export const LCContext = createContext(null);

export function LCHost(props) {
  const canvasRef = useRef(null);
  const [lcState, setLcState] = useState(null);

  useEffect(() => {
    if (typeof window === undefined) {
      return () => {};
    }
    if (
      !lcState &&
      canvasRef.current &&
      canvasRef.current instanceof HTMLCanvasElement
    ) {
      try {
        const lc = lightningChart({
          sharedContextOptions: {
            canvas: canvasRef.current,
            useIndividualCanvas: false,
          },
        });
        setLcState(lc);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (lcState && "dispose" in lcState) {
        lcState.dispose();
      }
    };
  }, [setLcState, lcState]);

  return (
    <div
      style={{
        ...props.style,
        position: "absolute",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    >
      {typeof window !== undefined && <canvas ref={canvasRef}></canvas>}
      <LCContext.Provider value={lcState}>{props.children}</LCContext.Provider>
    </div>
  );
}
