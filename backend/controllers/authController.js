const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors 
const handleErrors = (err) => {
    let errors = [];

    // duplicate email error
    if (err.code === 11000) {
        errors.push('that email is already registered');
        return errors;
    }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.push('that email is not registered');
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.push('that password is incorrect');
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors.push(properties.message);
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'yasseralbalola', { expiresIn: maxAge });
}

const signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            token: token,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            token: token,
            name: user.name,
            email: user.email
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
}

module.exports = {
    signup_post,
    login_post,
    logout_get
}