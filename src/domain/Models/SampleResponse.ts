import ResponseDto from "./ResponseDto";

export default class SampleResponse implements ResponseDto {
    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
    statusCode: number;
    message: string;

    json = () => {
        return JSON.stringify(this);
    }
}
