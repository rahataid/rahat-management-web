export function interruptChainActions<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T> | void {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function');
  }

  if (process.env.NEXT_PUBLIC_DISABLE_CHAIN_ACTIONS === 'true') {
    alert('Chain actions are disabled');
    console.error('Chain actions are disabled');
    return;
  }

  try {
    return fn(...args);
  } catch (error) {
    console.error('An error occurred while executing the function', error);
  }
}
