// const cookies = new Cookies();

// const handleSubmit = async (e) =>{
//     e.preventDefault();
//     const {fullName, username, password, avatarURL} = form;
//     const URL = 'http://localhost:5000/auth';
//     const {data: {token, userId, hashedPassword}} =  await axios.post('${URL}/${isSignup ? 'signup' : 'login'}', { username, password, fullName, phoneNumber, avatarURL });
//     cookies.set('token', token);
//     cookies.set('username', username);
//     cookies.set('fullName', fullName);
//     cookies.set('userId', userId);
//     if(isSignup){
//         cookies.set('phoneNumber', phoneNumber);
//         cookies.set('avatarURL', avatarURL);
//         cookies.set('hashedPassword', hashedPassword);
//     }
//     window.location.reload();
// }