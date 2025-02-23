const {db} = require("../../../config/firebase.config");

const usersCollection = db.collection('db_users');


// get user by email
exports.getUserByEmail = async (email) => {
    const querySnapshot = await usersCollection.where('email', '==', email).limit(1).get();

    if (querySnapshot.empty) {
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, ...userDoc.data() };
};