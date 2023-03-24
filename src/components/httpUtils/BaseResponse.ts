import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { contentTypeEnum } from "./ContentType";

export default class BaseResponse {
    constructor(status: number, body: string, content: contentTypeEnum = null){
        this.status = status;
        this.body = body;
        this.headers = {
            'Content-Type': content?.toString() ?? contentTypeEnum.json
        }
    }

    status: number;
    body: string;
    headers: any;
}