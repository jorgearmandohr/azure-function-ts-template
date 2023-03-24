import ResponseDto from "./ResponseDto";

export default class SampleResponse extends ResponseDto {
    constructor(statusCode: number, message: string) {
        super(statusCode, message);
        this.statusCode = statusCode;
        this.message = message;
    }
    
    statusCode: number;
    message: string;
}
