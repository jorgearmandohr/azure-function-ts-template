import { HttpRequest } from "@azure/functions";
import SampleResponse from "../../domain/Models/SampleResponse";
import SampleResource from "../../domain/Models/SampleResourceModel";

export default interface IResourceApi{
    get(req: SampleResource):Promise<SampleResponse>;
}