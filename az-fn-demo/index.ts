import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import startup from "../src/startup";
import IResourceApi from "../src/Infrasctructure/Api/IResourceApi";

const appStartup: startup = new startup();
const api: IResourceApi = appStartup.container.get<IResourceApi>(Symbol.for('IResourceApi'));

const run: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log(`Running function demo ${context.invocationId}  with request data: `, context.req);
    let response = await api.get(req);

    context.res.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'my-custom-header': 'isOk',
    };
    context.res.status = 200;
    context.res.body = response;
};

module.exports = run.bind(this);