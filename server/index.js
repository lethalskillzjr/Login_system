const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require ('./models/employee')

const app = express()

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await EmployeeModel.findOne({email: email})
        //password check
        if(user) {
            if(user.password === password) {
                res.status(200).json('success')
            } else {
                res.status(401).json('Invalid credentials');
            }
        } else {
            res.json('No record existed')
        }
    } catch (err) {
        console.error('Error:', err)
        res.status(500).json({message: err.message})
    }
})

app.post('/register', async(req, res) => {
    try{
        const Employee = EmployeeModel.create(req.body)
        res.status(200).json(Employee)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

//database connection
mongoose.connect('mongodb+srv://Ginko:fYAUVKh0fsSTJOsL@cluster0.mmlv1.mongodb.net/login-system?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to mongoDB')
    app.listen(3001, () => {
        console.log('server is running on port 3001')
    })
}).catch((err) => console.log(err))