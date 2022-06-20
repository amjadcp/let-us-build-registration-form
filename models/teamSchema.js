const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    team: String,
    membersWithLap: [{
        name: String,
        email: String,
        phoneNumber: Number,
        jsLevel: {
            type: String,
            enum: {
                values: ["absolute-beginner", "beginner", "intermediate"],
            }
        }
    }],
    membersWithoutLap:[{
        name: String,
        email: String,
        phoneNumber: Number,
        jsLevel: {
            type: String,
            enum: {
                values: ["absolute-beginner", "beginner", "intermediate"],
            }
        }
    }]
}, {timestamps: true})

module.exports = mongoose.model("TeamSchema", TeamSchema)