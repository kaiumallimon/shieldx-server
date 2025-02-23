const { db } = require('./../../../config/firebase.config');

const usersCollection = db.collection('db_users');


// create user
exports.createUser = async (userId, data) => {
    try {
        await usersCollection.doc(userId).set(data);
    } catch (error) {
        console.log('Error creating user: ', error);
    }
};


// get user by email
exports.getUserByEmail = async (email) => {
    const querySnapshot = await usersCollection.where('email', '==', email).limit(1).get();

    if (querySnapshot.empty) {
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, ...userDoc.data() };
};