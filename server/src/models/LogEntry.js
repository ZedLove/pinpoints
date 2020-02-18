const mongoose = require('mongoose')

const { Schema } = mongoose

const reqNumber = { type: Number, required: true }

const logEntrySchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    comments: String,
    rating: { type: Number, min: 0, max: 10, default: 0 },
    latitude: { ...reqNumber, min: -90, max: 90 },
    longitude: { ...reqNumber, min: -180, max: 180 },
    visitedAt: { type: Date, required: true }
  },
  { timestamps: true }
)

const LogEntry = mongoose.model('LogEntry', logEntrySchema)

module.exports = LogEntry
