const { db } = require('../../../config/firebase.config');

const passwordCollection = db.collection('db_saved_passwords');

// store password
exports.storePassword = async (userId, documentId, data) => {
    try {
        await passwordCollection.doc(documentId).set(data);
    } catch (error) {
        console.log('Error storing password: ', error);
    }
};


// get all passwords of a user
exports.getAllPasswords = async (userId) => {
    try {
        // Query the password collection for the given userId
        const snapshot = await passwordCollection.where('userId', '==', userId).get();

        // If no documents are found
        if (snapshot.empty) {
            console.log('No passwords found for this user.');
            return [];
        }

        // Create an array to store the passwords
        const passwords = [];
        snapshot.forEach(doc => {
            passwords.push(doc.data());  // Push the data of each document
        });

        return passwords;  // Return all the password documents
    } catch (error) {
        console.log('Error getting passwords: ', error);
    }
};



// delete a password
exports.deletePassword = async (passwordId) => {
    try {
        await passwordCollection.doc(passwordId).delete();
        return {
            status: true,
            message: 'Password deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting password: ', error);
        return {
            status: false,
            message: 'Error deleting password'
        };
    }
};



// update a password
exports.updatePassword = async (passwordId, data) => {
    try {
        const docRef = passwordCollection.doc(passwordId);
        const doc = await docRef.get();

        if (doc.exists) {
            const existingData = doc.data();
            console.log('Existing Data:', existingData);

            existingData.clientPassword = data.clientPassword || existingData.clientPassword;  // Update as necessary
            existingData.clientTitle = data.clientTitle || existingData.clientTitle;
            existingData.clientUsername = data.clientUsername || existingData.clientUsername;
            existingData.clientUrl = data.clientUrl || existingData.clientUrl;
            existingData.notes = data.notes || existingData.notes;

            await docRef.update({
                clientPassword: existingData.clientPassword,
                clientTitle: existingData.clientTitle,
                clientUsername: existingData.clientUsername,
                clientUrl: existingData.clientUrl,
                notes: existingData.notes
            });

            return {
                status: true,
                message: 'Password updated successfully'
            };
        } else {
            return {
                status: false,
                message: 'Password not found'
            };
        }

    } catch (error) {
        console.error('Error updating password:', error);
        return {
            status: false,
            message: 'Error updating password'
        };
    }
};




// get a password
exports.getPassword = async (passwordId) => {
    try {
        const doc = await passwordCollection.doc(passwordId).get();
        if (doc.exists) {
            const data = doc.data();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error getting password: ', error);
        return null;
    }
};  
