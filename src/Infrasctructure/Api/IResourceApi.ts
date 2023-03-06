import { HttpRequest } from "@azure/functions";
import SampleResponse from "../../domain/Models/SampleResponse";

export default interface IResourceApi{
    get(req: HttpRequest):Promise<SampleResponse>;
}