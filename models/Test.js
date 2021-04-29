import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    options: {
        type: mongoose.Schema.Types.ObjectId,
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