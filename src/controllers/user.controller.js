import { User } from '../models/User.js'
import { SECRET } from "../config.js";
import { comparePassword, encryptPassword } from '../utils/encrypt.js'
import jwt from 'jsonwebtoken'
import { validateEmail, validateName, validatePassword } from '../utils/validation.js'

export const signup = async (req, res) => {
    try {
        const { email, password, username, birthday, gender } = req.body

        if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email' })
        if (!validateName(username)) return res.status(400).json({ message: 'Invalid username' })
        if (!validatePassword(password)) return res.status(400).json({ message: 'Invalid password' })

        const userFound = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (userFound) {
            return res.status(409).json({ message: "Conflict" });
        }

        const emailFound = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (emailFound) {
            return res.status(409).json({ message: "Conflict" });
        }

        const newUser = new User({
            email,
            password: await encryptPassword(password),
            username,
            birthday,
            gender
        })

        const savedUser = newUser.save()

        const token = jwt.sign({ id: savedUser._id }, SECRET, {
            expiresIn: 60 * 60 * 24
        });

        res.status(201).json({ token })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const signin = async (req, res) => {
    try {
        const { email } = req.body
        const userFound = await User.findOne({
            where: {
                email
            }
        })

        if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

        const matchPassword = await comparePassword(
            req.body.password,
            userFound.password
        )

        if (!matchPassword) {
            return res.status(401).json({
                token: null,
                message: 'Unauthorized'
            })
        }

        const token = jwt.sign({ id: userFound.id }, SECRET, {
            expiresIn: 60 * 60 * 24
        });

        res.json({ token })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.userId, { password: 0 })

        if (!userFound) return res.status(404).json({ message: 'User not found' })

        res.json(userFound)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: 'User not found' })
        return res.json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { username, password, gender } = req.body

        const updatedUser = await User.findByPk(id)
        updateUser.email
        updateUser.birthdate

        updatedUser.username = username || updatedUser.username
        updatedUser.gender = gender || updatedUser.gender
        updatedUser.password = password || updatedUser.password
        await updatedUser.save()

        return res.json(updatedUser)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await User.destroy({
            where: {
                id
            }
        })

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


