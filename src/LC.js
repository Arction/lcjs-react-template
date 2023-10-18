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
  const [lcReady, setLcReady] = useState(false);

  useEffect(() => {
    if (!lcRef.current && canvasState && !lcReady) {
      try {
        lcRef.current = lightningChart({
          sharedContextOptions: {
            canvas: canvasState,
            useIndividualCanvas: false,
          },
        });
        setLcReady(true);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (lcRef.current && "dispose" in lcRef.current) {
        lcRef.current.dispose();
        lcRef.current = null;
        setLcReady(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lcRef, canvasState, setLcReady]);

  return (
    <>
      <canvas key={id} ref={(newRef) => setCanvasState(newRef)}></canvas>
      {canvasState && lcRef.current !== undefined && (
        <LCContext.Provider value={lcRef.current}>
          {props.children}
        </LCContext.Provider>
      )}
    </>
  );
}
