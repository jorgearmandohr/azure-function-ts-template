import { HttpRequest } from "@azure/functions";
import IResourceApi from "../../../src/Infrasctructure/Api/IResourceApi";
import startup from "../../../src/startup";
import SampleResource from "../../../src/domain/Models/SampleResourceModel";

describe('first', () => {
    let api: IResourceApi;
    beforeEach(() => {
        const appStartup: startup = new startup();
        api = appStartup.container.get<IResourceApi>(Symbol.for('IResourceApi'));
    });

    test('should return ok', () => {
        const request: HttpRequest = {
            query: { 'name': 'test' },
            url: '/clone?name=test',
            method: null,
            headers: null,
            params: null,
            user: null,
            parseFormBody: null,
            get: jest.fn()
        };

        const requestModel = new SampleResource().bindRequest(request);

        api.get(requestModel).then(data => {
            expect(data.statusCode).toBe(200);
        });
    })
})