export function debounce(fn: (...args: any) => unknown, ms = 1) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.call(this, ...args), ms);
  };
}
