import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { MONGO_URL, SALT_ROUNDS } from '../../config/config.js'
import { generateAccessToken, generateRefreshToken, getTokenExpirationDate, validateRefreshToken } from '../../utils/token-utils.js'

await mongoose.connect(MONGO_URL + 'expensesDB')

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
})

const tokensSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', usersSchema)
const Tokens = mongoose.model('Tokens', tokensSchema)

export class AuthModel {
  async login ({ email, password }) {
    const user = await User.findOne({ email })
    if (!user) throw new Error('There is no user with that email')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Password incorrect')

    const tokenInfo = { userId: user._id, email: user.email, name: user.name }
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    await Tokens({ userId: user._id, refreshToken }).save()

    return { accessToken, refreshToken }
  }

  async register ({ email, password, name }) {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new Error('User already exists')

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = new User({ name, email, password: passwordHash })
    await newUser.save()

    const tokenInfo = { userId: newUser._id, email: newUser.email, name: newUser.name }
    const accessToken = generateAccessToken(tokenInfo)
    const refreshToken = generateRefreshToken(tokenInfo)

    await Tokens({ userId: newUser._id, refreshToken }).save()

    return { accessToken, refreshToken }
  }

  async refresh (input) {
    const validatedToken = validateRefreshToken(input)
    if (!validatedToken) throw new Error('Token invalid')
    console.log('validatedToken', validatedToken)

    const refreshToken = Tokens.findOne({ userId: validatedToken.userId })
    if (!refreshToken) throw new Error('Couldnt find any valid refresh token')

    const expiringDate = getTokenExpirationDate(validatedToken)
    if (expiringDate < new Date()) throw new Error('Refresh token expired')

    const tokenInfo = { userId: validateRefreshToken.userId, email: validateRefreshToken.email, name: validateRefreshToken.name }
    const accessToken = generateAccessToken(tokenInfo)

    return accessToken
  }

  async deleteUser (id) {
    return await User.findByIdAndDelete(id)
  }
}
