import * as base62 from 'base62/lib/ascii';

export function generateRandomStr(len: number) {
  let str = '';

  for (let k = 0; k < len; k++) {
    const num = Math.floor(Math.random() * 62);
    str += base62.encode(num);
  }

  return str;
}
