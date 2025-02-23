const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('./../models/auth.model');


exports.register = async (data) => {
    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Prepare the user data
        const userData = {
            name: data.name,
            email: data.email,
            password: hashedPassword
        };

        // Save user data to Firestore
        const userId = Date.now().toString(); // Generate a unique userId
        await authModel.createUser(userId, userData); // Save user to Firestore

        return { status: 201, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during registration:', error);
        return { status: 500, message: 'Internal Server Error' };
    }
};


exports.login = async (data)=>{
    const user = await authModel.getUserByEmail(data.email);

    console.log('user', user);
    
    if(!user) return {
        status: 404,
        message: 'User not found',
    };

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid) return {
        status: 401,
        message: 'Invalid password',
    };

    const token = jwt.sign({userId: user.userId}, process.env.JWT_SECRET);
    return {
        status: 200,
        message: 'Login successful',
        data: {token},
    };
};