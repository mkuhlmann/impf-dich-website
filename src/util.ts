import path from 'path';

console.log(import.meta.url);

export const __basedir = path.dirname(import.meta.url.substring(7));
