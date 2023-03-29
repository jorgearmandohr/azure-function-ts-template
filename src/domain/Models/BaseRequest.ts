import { HttpRequest } from "@azure/functions";
import { IsNotEmpty, ValidationError, validate } from "class-validator";

export default abstract class BaseRequest {
    constructor() {
    }

    private _validationErrors: ValidationError[];
    public get validationErrors(): ValidationError[] {
        return this._validationErrors;
    }

    /**
     * 
     * @param req to be implemented, bind request params to properties
     */
    public abstract bindRequest(req: HttpRequest): any;

    /**
     * 
     * @returns true or false if model passes the validations
     */
    public validate = async (): Promise<boolean> => {
        this._validationErrors = await validate(this);

        return this.validationErrors.length === 0;
    }
}
