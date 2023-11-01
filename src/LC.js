// React logic for managing LightningChart JS instances that are shared
// between any LCJS based components that can be visible at the same time
// In simple use cases with 1-2 charts visible at once, there is no need to use these.
// However, with more charts visible at once, this gives an incredible performance advantage, since all charts use a shared LC context.
// See usage example in ./Components/MyChartComponent.js and ./App.js

import { createContext, useEffect, useRef, useState, useId } from "react";
import { lightningChart } from "@arction/lcjs";

export const LCContext = createContext(null);

export function LCHost(props) {
  const [canvasState, setCanvasState] = useState(null);
  const lcRef = useRef(null);
  const id = useId();
  const [lcState, setLcState] = useState(undefined);

  useEffect(() => {
    if (!lcRef.current && canvasState) {
      try {
        lcRef.current = lightningChart({
          sharedContextOptions: {
            canvas: canvasState,
            useIndividualCanvas: false,
          },
        });
        setLcState(lcRef.current);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (lcRef.current && "dispose" in lcRef.current) {
        lcRef.current.dispose();
        lcRef.current = null;
        setLcState(undefined);
      }
    };
  }, [canvasState]);

  return (
    <>
      <canvas key={id} ref={(newRef) => setCanvasState(newRef)}></canvas>
      <LCContext.Provider value={lcState}>{props.children}</LCContext.Provider>
    </>
  );
}
