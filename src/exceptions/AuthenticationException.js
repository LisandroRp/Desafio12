

class AuthenticationException extends Error{
    constructor(error, message){
        super();
        this.error = error;
        this.name = 'AuthenticationException';
        this.message = message;
    }
}
export default AuthenticationException 