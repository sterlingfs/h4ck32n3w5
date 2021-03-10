export function allSettled<T>(
  promises: Promise<T>[],
  onSettled: (arg: T[]) => void,
  onError: (error: Error) => void = () => {}
) {
  return Promise.allSettled(promises)
    .then((res) => {
      const values = res.map((r) => (r as PromiseFulfilledResult<T>).value);
      onSettled(values);
    })
    .catch(onError);
}



