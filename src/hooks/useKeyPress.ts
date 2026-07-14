import { useEffect } from "react";

export function useKeyPress(
  targetKey: string,
  callback: (e: KeyboardEvent) => void,
  modifier?: "ctrl" | "meta" | "shift" | "alt"
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      let modifierMatch = true;
      if (modifier === "ctrl") modifierMatch = event.ctrlKey;
      if (modifier === "meta") modifierMatch = event.metaKey;
      if (modifier === "shift") modifierMatch = event.shiftKey;
      if (modifier === "alt") modifierMatch = event.altKey;

      // Handle combo key like Ctrl+K
      if (
        event.key.toLowerCase() === targetKey.toLowerCase() &&
        modifierMatch
      ) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [targetKey, callback, modifier]);
}
