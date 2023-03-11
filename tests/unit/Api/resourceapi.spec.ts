import { HttpRequest } from "@azure/functions";
import IResourceApi from "../../../src/Infrasctructure/Api/IResourceApi";
import startup from "../../../src/startup";

describe('first', () => {
    let api: IResourceApi;
    //const demoService: IDemoService = appStartup.container.get<IDemoService>(Symbol.for('IDemoService'));
    beforeEach(() => {
        const appStartup: startup = new startup();
        api = appStartup.container.get<IResourceApi>(Symbol.for('IResourceApi'));
    });
    test('should return ok', () => {
        const request: HttpRequest = {
            query: { 'name': 'test' },
            url: "/clone?name=test",
            method: null,
            headers: null,
            params: null,
            user: null,
            parseFormBody: null,
            get: null
        };
        
        api.get(request).then(data => {
            expect(data.statusCode).toBe(200);
        });
    })
})