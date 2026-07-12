export function generateHash(len: number) {
  const options =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = options.length;

  let hash = "";

  for (let i = 0; i < len; i++) {
    hash += options[Math.floor(Math.random() * length)];
  }

  return hash;
}
