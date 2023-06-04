export function clearTimer(
  timerActive: boolean,
  seconds: number,
  setSeconds: (value: number) => void,
  clearFunction: () => void
) {
  if (timerActive && seconds > 0) {
    setTimeout(setSeconds, 1000, seconds - 1);
  } else if (seconds === 0) {
    console.log("Чистим, чистим и слизываем...")
    clearFunction();
  }
}