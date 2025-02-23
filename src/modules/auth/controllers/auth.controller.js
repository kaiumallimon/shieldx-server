const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        const result = await authService.register({ name, email, password });

        if (!result || !result.status) {
            return res.status(500).json({ message: 'Internal Server Error: Missing status code in response' });
        }

        return res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

exports.login = async (req, res) => {

    try{
        if(!req.body.email || !req.body.password){
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const result = await authService.login(req.body);

        if(!result || !result.status){
            return res.status(500).json({ message: 'Internal Server Error: Missing status code in response' });
        }

        return res.status(result.status).json(result);
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};