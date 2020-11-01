export function toggle(): (arg: boolean) => boolean {
  return function toggleOperator(prevValue: boolean): boolean {
    return !prevValue;
  };
}
