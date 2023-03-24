export default abstract class ResponseDto{
    constructor(statusCode: number, message: string){
        this.statusCode = statusCode;
        this.message = message;
    }

    statusCode: number;
    message: string;

    json = () => {
        return JSON.stringify(this);
    }
}