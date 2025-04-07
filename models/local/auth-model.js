import { jsonImport, writeJson } from '../../utils/json-utils.js'
import { SALT_ROUNDS } from '../../config/config.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from '../../utils/token-utils.js'

const users = jsonImport('../json/users.json')
const tokens = jsonImport('../json/tokens.json')

function createTokenInfo ({ id, email, name, userImage }) {
  return {
    userId: id,
    email,
    name,
    userImage,
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
    writeJson('../json/tokens.json', tokens)

    return { accessToken, refreshToken }
  }

  static async register ({ email, password, name, userImage }) {
    const user = users.find(user => email === user.email)
    if (user) throw new Error('User already exists')

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password: passwordHash,
      name,
      userImage
    }

    const tokenInfo = createTokenInfo(newUser)
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    tokens.push({ refreshToken })
    users.push(newUser)

    writeJson('../json/users.json', users)
    writeJson('../json/tokens.json', tokens)

    return { accessToken, refreshToken }
  }

  static async refresh ({ input }) {
    const { token } = input
    const validatedToken = validateRefreshToken(token)
    if (!validatedToken) throw new Error('Token invalid')
    if (validatedToken.timeStamp + 7 * 24 * 60 * 60 * 1000 < Date.now()) throw new Error('Token expired')

    const refreshToken = tokens.find(token => validatedToken === token)
    if (!refreshToken) throw new Error('Token not found')

    const tokenInfo = createTokenInfo(refreshToken)

    const accessToken = generateAccessToken(tokenInfo)
    return { accessToken }
  }
}
