import { jsonImport, writeJson } from '../../utils/json-utils.js'
import { SALT_ROUNDS } from '../../config/config.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from '../../utils/token-utils.js'

const users = jsonImport('../json/users.json')
const tokens = jsonImport('../json/tokens.json')

function createTokenInfo ({ id, email, name }) {
  return {
    userId: id,
    email,
    name,
    timeStamp: Date.now()
  }
}

export class AuthModel {
  static async login ({ email, password }) {
    const user = users.find(user => email === user.email)
    if (!user) throw new Error('User not found')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Password incorrect')

    const tokenInfo = createTokenInfo(user)
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    tokens.push({ refreshToken })
    await writeJson('../json/tokens.json', tokens)

    return { accessToken, refreshToken }
  }

  static async register ({ email, password, name }) {
    const user = users.find(user => email === user.email)
    if (user) throw new Error('User already exists')

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password: passwordHash,
      name
    }

    const tokenInfo = createTokenInfo(newUser)
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    tokens.push({ refreshToken })
    users.push(newUser)

    await writeJson('../json/tokens.json', tokens)
    await writeJson('../json/users.json', users)

    return { accessToken, refreshToken }
  }

  static async refresh (input) {
    const validatedToken = validateRefreshToken(input)
    if (!validatedToken) throw new Error('Token invalid')

    if (validatedToken.timeStamp + 10 * 24 * 60 * 60 * 1000 < Date.now()) {
      throw new Error('Token expired')
    }

    const foundToken = tokens.find(t => t.refreshToken === input)
    if (!foundToken) throw new Error('Token not found')

    const tokenInfo = createTokenInfo(validatedToken) // Usás el decodificado
    const accessToken = generateAccessToken(tokenInfo)

    return accessToken
  }
}
