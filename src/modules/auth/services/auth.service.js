const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('./../models/auth.model');


exports.register = async (data) => {
    try {
        const existingUser = await authModel.getUserByEmail(data.email);
        if (existingUser) {
            return { status: 400, message: 'Email already in use' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userId = Date.now().toString(); // Unique user ID

        const userData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        };

        await authModel.createUser(userId, userData);

        return { status: 201, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during registration:', error);
        return { status: 500, message: 'Internal Server Error' };
    }
};



exports.login = async (data) => {
    try {
        const user = await authModel.getUserByEmail(data.email);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            return { status: 401, message: 'Invalid password' };
        }

        const accessToken = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return {
            status: 200,
            message: 'Login successful',
            data: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                accessToken,
                refreshToken,
            },
        };
    } catch (error) {
        console.error('Error during login:', error);
        return { status: 500, message: 'Internal Server Error' };
    }
};
