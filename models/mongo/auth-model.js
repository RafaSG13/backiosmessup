import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { MONGO_URL, SALT_ROUNDS } from '../../config/config.js'
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from '../../utils/token-utils.js'

await mongoose.connect(MONGO_URL + 'authDB')

const authSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  refreshTokens: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
})

const Auth = mongoose.model('Auth', authSchema)

export class AuthModel {
  static async login ({ email, password }) {
    const user = await Auth.findOne({ email })
    if (!user) throw new Error('User not found')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Password incorrect')

    const tokenInfo = { userId: user._id, email: user.email, name: user.username }
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    user.refreshTokens.push(refreshToken)
    await user.save()

    return { accessToken, refreshToken }
  }

  static async register ({ email, password, username }) {
    const existingUser = await Auth.findOne({ email })
    if (existingUser) throw new Error('User already exists')

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = new Auth({ username, email, password: passwordHash, refreshTokens: [] })
    await newUser.save()

    const tokenInfo = { userId: newUser._id, email: newUser.email, name: newUser.username }
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    newUser.refreshTokens.push(refreshToken)
    await newUser.save()

    return { accessToken, refreshToken }
  }

  static async refresh (input) {
    const validatedToken = validateRefreshToken(input)
    if (!validatedToken) throw new Error('Token invalid')

    const user = await Auth.findOne({ refreshTokens: input })
    if (!user) throw new Error('Token not found')

    const tokenInfo = { userId: user._id, email: user.email, name: user.username }
    const accessToken = generateAccessToken(tokenInfo)

    return accessToken
  }

  static async deleteUser (id) {
    return await Auth.findByIdAndDelete(id)
  }
}
