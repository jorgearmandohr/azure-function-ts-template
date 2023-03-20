import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import IResourceApi from "../src/Infrasctructure/Api/IResourceApi";
import SampleResource from "../src/domain/Models/SampleResourceModel";
import ILogService from "../src/domain/Contracts/ILogService";
import Startup from "../src/startup";

const run: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    const appStartup = new Startup(context);
    const logger: ILogService = appStartup.getInstance<ILogService>('ILogService');
    const api: IResourceApi = appStartup.getInstance<IResourceApi>('IResourceApi');

    logger.info(`Running function demo %s for path %s with request data: %s `, context.invocationId, context.req.url, context.req.rawBody);

    const requestModel = new SampleResource().bindRequest(req);
    let response = await api.get(requestModel);

    context.res.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'my-custom-header': 'isOk',
    };

    context.res.status = response.statusCode;
    context.res.body = response;
};

module.exports = run.bind(this);