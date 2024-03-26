const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema(
    
    {
        name: {
            type: String,
            required: [true, "please fill in your name"]
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true
    }
)

const EmployeeModel = mongoose.model('employees', EmployeeSchema);

module.exports = EmployeeModel;