import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import startup from "../src/startup";
import IResourceApi from "../src/Infrasctructure/Api/IResourceApi";
import SampleResource from "../src/domain/Models/SampleResourceModel";
import ILogService from "../src/domain/Contracts/ILogService";

const appStartup: startup = new startup();
const api: IResourceApi = appStartup.container.get<IResourceApi>(Symbol.for('IResourceApi'));
const logger: ILogService = appStartup.container.get<ILogService>(Symbol.for('ILogService'));

const run: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log(`Running function demo ${context.invocationId}  with request data: `, context.req.rawBody);

   //logger.info.bind(context.log); //context.log.bind(logger.info);
    //logger.info('prueba ok');
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