import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    grid_size: {
        type: Number
    },
    buttons_count: {
        type: Number
    },
    time_to_remember: {
        type: Number
    },
    failures: {
        type: Number
    },
    answer_time: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    is_visible: {
        type: Boolean,
        default: true
    }
})

export default mongoose.models.Test || mongoose.model('Test', TestSchema)