const { connect} = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex'); // random sequel of 16 Hexadecimal digits 

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);// 10: specifies = the level of encryption

        const token = serverClient.createUserToken(userId);

        res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber});

;    }catch(error){
        console.log(error);
        
        res(500).json({message: error});
    }
};

const login = async (req, res) => {
    try {
        const { username, password} = req.body;

        const serverClient = connect(api_key, api_secret, app_id);

        const client = StreamChat.getInstance(api_key, api_secret); //query all the users from the database

        const {users} = await client.queryUsers({name: username}); // only the users that match the name

        if(!users.length) return res.status(400).json({message: 'User not found'});

        // user exists
        const success = await bcrypt.compare(password, users[0].hashedPassword); 

        const token = serverClient.createUserToken(users[0].id);

        if(success){
            res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id});
        } else{
            res.status(500).json({message: 'Incorrect password'});
        }

    }catch(error){
        console.log(error);

        res(500).json({message: error});
    }
};


module.exports = { signup, login }