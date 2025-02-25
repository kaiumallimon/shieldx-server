const passwordModel = require('./../models/passwords.model');
const encryptor = require('./../../../utils/encryption.util');


// store password
exports.storePassword = async (req, res) => {
    try {
        const { userId, clientTitle, clientUsername, clientPassword, clientUrl, notes } = req.body;

        if (!userId || !clientTitle || !clientUsername || !clientPassword) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const encryptedPassword = encryptor.encryptPassword(clientPassword);
        const passwordId = "pass" + Date.now().toString();

        const newPasswordData = {
            userId,
            passwordId,
            clientTitle,
            clientUsername,
            clientPassword: encryptedPassword,
            clientUrl,
            notes
        };

        await passwordModel.storePassword(userId, passwordId, newPasswordData);

        res.status(201).json({ message: "Password stored successfully", passwordId });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


// gt all passwords
exports.getAllPasswords = async (req, res) => {
    try {
        const { userId } = req.params;
        const passwords = await passwordModel.getAllPasswords(userId);
        res.status(200).json({
            passwords: passwords
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// get password by id
exports.getPasswordById = async (req, res) => {
    try {
        const {passwordId } = req.params;
        const password = await passwordModel.getPassword(passwordId);
        
        if (password === null) {
            res.status(404).json({
                message: "Password not found"
            });
        }

        res.status(200).json({
            password: password
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


// update password
exports.updatePassword = async (req, res) => {
    try {

        const {passwordId, clientTitle, clientUsername, clientPassword, clientUrl, notes } = req.body;
        const encryptedPassword = encryptor.encryptPassword(clientPassword);
        const updatedData = {
            clientTitle,
            clientUsername,
            clientPassword: encryptedPassword,
            clientUrl,
            notes
        };

        const result = await passwordModel.updatePassword(passwordId, updatedData);

        if (result.status) {
            res.status(200).json({
                message: result.message,
                updatedData: result.updatedData
            });

        } else {
            res.status(404).json({
                message: result.message
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


// delete password
exports.deletePassword = async (req, res) => {
    try {
        const {passwordId } = req.params;
        await passwordModel.deletePassword(passwordId);
        res.status(200).json({
            message: "Password deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};