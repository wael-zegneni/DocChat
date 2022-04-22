const express = require('express'); 
const cors = require('cors'); // used for requests

const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config(); // allows us to call the env variables in our node app

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = require('twilio')(accountSid, authToken)

app.use(cors({
    origin: '*',
    credentials: true
})); // make cross origin requests
app.use(express.json()) // allows us to pass JSON payloads from the front to back
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello, World!!')
})

app.post('/', (req,res) => {
    const { message, user: sender, type, members } = req.body;
    if(type === 'message.new'){
        members
        filter((member) => member.user_id != sender.id)
        .forEach(({user}) => {
            if(!user.online){
                twilioClient.messages.create({
                    body: `Aya ija ija andek message men ${message.user.fullName} - ${message.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to : user.phoneNumber
                })
                .then(() => console.log('Message sent!'))
                .catch((err)=>console.log(err))
            }
        })

        res.status(200).send('Message sent!')
    }

    return res.status(200).send('Not a new message request')
})

app.use('/auth', authRoutes);

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))

