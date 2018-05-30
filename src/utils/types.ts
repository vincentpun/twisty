export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<RecursivePartial<U>>
      : RecursivePartial<T[P]>
};
