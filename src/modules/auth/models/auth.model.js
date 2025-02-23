const { db } = require('./../../../config/firebase.config');


// create user
exports.createUser = async(userId, data)=>{
    try{
        await db.collection('db_users').doc(userId).set(data);
    }catch(error){
        console.log('Error creating user: ', error);
    }
};


// get user by email
exports.getUserByEmail = async(email)=>{
    const snapshot = await db.collection('db_users').where('email', '==', email).get(); 
    return snapshot.empty? null: snapshot.docs[0].data();   
};