// React logic for managing LightningChart JS instances that are shared
// between any LCJS based components that can be visible at the same time
// In simple use cases with 1-2 charts visible at once, there is no need to use these.
// However, with more charts visible at once, this gives an incredible performance advantage, since all charts use a shared LC context.
// See usage example in ./Components/MyChartComponent.js and ./App.js

import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useId,
  PropsWithChildren,
} from "react";
import { LightningChart, lightningChart } from "@arction/lcjs";

export const LCContext = createContext<undefined | LightningChart>(undefined);

export function LCHost(props: PropsWithChildren) {
  const [canvasState, setCanvasState] = useState<
    undefined | null | HTMLCanvasElement
  >(undefined);
  const lcRef = useRef<undefined | LightningChart>(undefined);
  const id = useId();
  const [lcState, setLcState] = useState<undefined | LightningChart>(undefined);

  useEffect(() => {
    if (!lcRef.current && canvasState) {
      try {
        lcRef.current = lightningChart({
          license: process.env.REACT_APP_LCJS_LICENSE,
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
        lcRef.current = undefined;
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
