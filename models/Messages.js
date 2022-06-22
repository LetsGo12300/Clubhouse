const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessagesSchema = new Schema({
    message: String,
    title: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Messages = mongoose.model('Messages', MessagesSchema)

module.exports = Messages