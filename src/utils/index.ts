export const concatPath = (path: string, ...paths: string[]) => {
  return paths.reduce((pre, cur) => {
    if (cur) {
      return (
        (pre ? pre + "/" : pre) + (cur.startsWith("/") ? cur.slice(1) : cur)
      );
    }
    return pre;
  }, path);
};
