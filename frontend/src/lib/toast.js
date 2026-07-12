const listeners = new Set();

export const toast = {
  success(message) {
    listeners.forEach((listener) => listener({ type: "success", message }));
  },
  error(message) {
    listeners.forEach((listener) => listener({ type: "error", message }));
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
