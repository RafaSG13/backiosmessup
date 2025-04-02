import { createRequire } from 'node:module'

const required = createRequire(import.meta.url)
export const jsonImport = (path) => required(path)
