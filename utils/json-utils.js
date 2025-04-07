import { createRequire } from 'node:module'
import { writeFile } from 'node:fs/promises'

const required = createRequire(import.meta.url)
const jsonImport = (path) => required(path)

async function writeJson (path, data) {
  const json = JSON.stringify(data, null, 2)
  await writeFile(new URL(path, import.meta.url), json, 'utf-8')
}

export { jsonImport, writeJson }
