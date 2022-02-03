import User from './User.js'

class Message {
    constructor(message) {
        this.author = message ? message.author : new User(),
        this.text = message ? message.text : "";
        this.date = new Date().toLocaleString()
    }
}

export default Message;
