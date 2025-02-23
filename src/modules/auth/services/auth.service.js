const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('./../models/auth.model');


exports.register = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const userData = {
            name: data.name,
            email: data.email,
            password: hashedPassword
        };

        const userId = Date.now().toString();
        await authModel.createUser(userId, userData);

        return { status: 201, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during registration:', error);
        return { status: 500, message: 'Internal Server Error' };
    }
};


exports.login = async (data) => {
    const user = await authModel.getUserByEmail(data.email);

    console.log('user', user);

    if (!user) return {
        status: 404,
        message: 'User not found',
    };

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) return {
        status: 401,
        message: 'Invalid password',
    };

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
    return {
        status: 200,
        message: 'Login successful',
        data: { token },
    };
};