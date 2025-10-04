export const loadState = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.error("Load state error:", err);
    return undefined;
  }
};

export const saveState = (key: string, state: unknown): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Save state error:", err);
  }
};
