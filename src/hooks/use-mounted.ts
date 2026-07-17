import { useSyncExternalStore } from "react";

// SSR-safe "mounted" detection without setState-in-effect.
// Returns false during SSR + first hydration snapshot, true afterwards.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
