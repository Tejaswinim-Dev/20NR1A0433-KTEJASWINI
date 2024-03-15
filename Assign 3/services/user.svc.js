const userModel = require("../models/users.model")

const userService = {
    getByEmail: (email) => {
        return userModel.findOne({ email }, { __v: 0,createdAt:0, updatedAt: 0 })
    },
    add: (data) => {
        const user = new userModel(data)
        return user.save()
    },
    updatePassword: (data)=>{
        return userModel.findOneAndUpdate({email:data.email},{$set: {password: data.password,previousPasswords : data.previousPasswords,passwordCreatedAt: data.passwordCreatedAt}},{new: true})
    }
}

module.exports = userService