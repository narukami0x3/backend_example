const model = require('../model/admin_model')

exports.getusers = async (req,res) => {
    try {
        const row = await model.getusers()
        res.status(200).json({data: row})
    } catch (error) {
        res.status(500).json({message: "inthernal server error"})
    }   
}

exports.rmuser = async (req,res) => {
    const {id} = req.params
    try {
        const row = await model.rmuser(id)
        if(!row) return res.status(400).json({message: "delete user failed"})
        res.status(200).json({message: "delete success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "inthernal server error"})
    }
}

exports.edituser = async (req,res) => {
    const {id} = req.params
    const {username,fname,lname,phone,address} = req.body
        const row = await model.edituser(id,username,fname,lname,phone,address);
        console.log(row)
        if(!row) return res.status(400).json({message: "edit user failed"})
        res.status(200).json({message: "update success"})
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "inthernal server error"})
    }
}