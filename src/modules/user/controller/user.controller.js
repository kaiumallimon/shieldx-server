const userModel = require('./../model/user.model');

exports.getUserInfo = async (req, res) => {
    const { email } = req.body;

    if (!email) {
       return res.status(400).json({ message: "Please provide an email." });
    }

    try {
        const userData = await userModel.getUserByEmail(email);

        const { password, ...userWithoutPassword } = userData;

        return res.status(201).json(userWithoutPassword);
    } catch (err) {
        return res.status(500).json({ message: "Internal error" });
    }
};