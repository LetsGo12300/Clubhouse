const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    membershipStatus: {
        type: String,
        default: 'Non-member'
    }
})

const User = mongoose.model('Users', UsersSchema)

module.exports = User