import SampleResource from "../../domain/Models/SampleResource";

export default interface IResourceApi {
    get(req: SampleResource): Promise<any>;
}