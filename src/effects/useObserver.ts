import { Options } from "../types";

export function useObserver(id: string, opts: Partial<Options>) {
  // const { eventType, path } = { ...initOptions, ...opts } as Options;
  // const [item, setItem] = useState<Snap>();
  // useEffect(() => {
  //   const database = firebase.database();
  //   const ref = database.ref(`/v0/${path}/${id}`);
  //   ref.on(eventType, setItem);
  //   return () => ref.off(eventType, setItem);
  // }, [id, eventType, path]);
  // return item;
}
