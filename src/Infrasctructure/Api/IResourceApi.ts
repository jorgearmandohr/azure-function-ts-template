import SampleResource from "../../domain/Models/SampleResourceModel";

export default interface IResourceApi {
    get(req: SampleResource): Promise<any>;
}