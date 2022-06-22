const mongoose = require('mongoose')
const { format } = require('date-fns')
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

// Create virtual property
MessagesSchema.virtual('formatTimestamp').get(function(){
    // format date
    return format(this.timestamp, 'h:mma · d MMM yy')
})

const Messages = mongoose.model('Messages', MessagesSchema)

module.exports = Messages