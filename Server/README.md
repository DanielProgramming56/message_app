Server Application

functionality:
1) Create User 'POST' user
2) Authenticate User 'LOGIN' user
3) Edit User Profile 'PUT' user
4) 'GET' messages from database
5) 'CREATE' message and 'SAVE' to data base
5) 'DELETE' my messages

Models => 
	1) User
	2) Messages

User Schema => 
	_id: ' '
	user_name:''
	email:''
	password:''
	profile-image:''
	chats:[
	 to: '_id'
	 messages: [
	 ]
	]

Message Schema => 
	_id: ' '
	message: ''
	user_name: ""