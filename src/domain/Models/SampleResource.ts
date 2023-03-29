import { IsNotEmpty } from "class-validator";
import { HttpRequest } from "@azure/functions";
import BaseRequest from "./BaseRequest";

export default class SampleResource extends BaseRequest {
    constructor(){
        super();
    }

    public override bindRequest(req: HttpRequest): any {
        this.name = req.query['name'];
        return this;
    }

    @IsNotEmpty()
    public name: string;
}

