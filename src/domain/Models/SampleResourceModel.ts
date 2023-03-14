import { IsNotEmpty, ValidationError, validate } from "class-validator";
import { HttpRequest } from "@azure/functions";

export default class SampleResource {
    bindRequest = (req: HttpRequest) : SampleResource => {
        this.name = req.query['name'];

        return this;
    }

    validate = async (): Promise<ValidationError[]>  => {
        return await validate(this);
    }

    @IsNotEmpty()
    name: string;
}