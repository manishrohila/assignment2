const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const registerUser = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                msg: 'Entered email id is already registered with us. Login to continue'
            });
        }
        const user = new User({
            email, password
        });
        //save user object
        user.save()
            .then((user) => {
                res.status(201).json({
                    success: true,
                    msg: 'user register successfully'
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    msg: 'Server encountered some issues'
                });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'server having some issues'
        })
    }

};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized user'
        })
    };
};

module.exports = {
    registerUser,
    authUser
}