import ResponseDto from "./ResponseDto";

/**
 * RFC 7807 implementation
 */
export default class ProblemResponseDto extends ResponseDto {
    constructor(statusCode: number, message: string, errorsDetail: string[] = null){
        super(statusCode, message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorsDetail = errorsDetail;
    }
    
    statusCode: number;
    message: string;
    type: string;
    instance: string;
    errorsDetail: string[];
}