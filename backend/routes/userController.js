// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = (req, res) => {
    
    const {name, email, password} = req.body
    
    // validation
    if(!name || !email || !password) {
        res.status(400)
        throw  new Error('Login was not valid')
    }

    res.send('Register Route')
}

// @desc Register a new user
// @route /api/users/login
// @access Public
const loginUser = (req, res) => {
    res.send('Login Route')
}

module.exports = {

    registerUser,
    loginUser,

}