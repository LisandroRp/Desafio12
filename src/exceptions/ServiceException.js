

class ServiceException extends Error{
    constructor(error, description, message){
        super();
        this.error = error ? error : 500;
        this.name = 'ServiceException';
        this.description = description;
        this.message = message;
    }
}
  export default ServiceException