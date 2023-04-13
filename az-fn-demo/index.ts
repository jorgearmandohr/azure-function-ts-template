import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import IResourceApi from "../src/Infrasctructure/Api/IResourceApi";
import SampleResource from "../src/domain/Models/SampleResource";
import ILogService from "../src/domain/Contracts/ILogService";
import Startup from "../src/startup";
import ProblemResponseDto from "../src/domain/Models/ProblemResponseDto";
import { contentTypeEnum } from "../src/components/httpUtils/ContentType";
import { HttpStatusCode } from "../src/components/httpUtils/HttpStatusCode";
import BaseResponse from "../src/components/httpUtils/BaseResponse";
import SampleResponse from "../src/domain/Models/SampleResponse";

const run: AzureFunction = async function (context: Context, req: HttpRequest, appStartup: Startup = new Startup()): Promise<any> {
    appStartup.registerContextDependencies(context);
    const logger: ILogService = appStartup.getInstance<ILogService>('ILogService');
    const api: IResourceApi = appStartup.getInstance<IResourceApi>('IResourceApi');

    logger.info(
        `Running function demo %s for path %s with request data: %s `,
        context.invocationId,
        context.req?.url,
        context.req?.rawBody);

    let baseResponse: BaseResponse;

    try {
        const requestModel = new SampleResource().bindRequest(req);
        let response: SampleResponse = await api.get(requestModel);

        baseResponse = new BaseResponse(
            response.statusCode,
            response.json(),
            contentTypeEnum.json);
    } catch (error) {
        const problemResponse = new ProblemResponseDto(
            HttpStatusCode.InternalServerError,
            'An internal error has ocurred. See details for reference.',
            [error.message]);
        baseResponse = new BaseResponse(
            HttpStatusCode.InternalServerError,
            problemResponse.json(),
            contentTypeEnum.jsonProblem);
    }

    context.res = baseResponse;

    logger.info(
        `Function %s complete with status code %s `,
        context.invocationId,
        context.res.status);
};

export default run;