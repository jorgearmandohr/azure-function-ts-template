import "reflect-metadata";

import { Container } from "inversify";
import { IDemoService } from "./domain/Contracts/IDemoService";
import DemoService from "./domain/Services/DemoService";
import ResourceApi from "./Infrasctructure/Api/ResourceApi";
import IResourceApi from "./Infrasctructure/Api/IResourceApi";
import ILogService from "./domain/Contracts/ILogService";
import LogService from "./Infrasctructure/ServiceClients/LogManager/LogService";
import IHttpServiceClient from "./domain/Contracts/IHttpServiceClient";
import HttpServiceClient from "./Infrasctructure/ServiceClients/httpServiceClient/HttpServiceClient";

export default class Startup {
    private _container: Container;

    constructor() {
        this._container = new Container();
        this.registerServices();
        this.registerApis();
    }

    private registerServices() {
        this._container.bind<IDemoService>(Symbol.for("IDemoService")).to(DemoService).inRequestScope();
        this._container.bind<ILogService>(Symbol.for("ILogService")).to(LogService).inRequestScope();
        this._container.bind<IHttpServiceClient>(Symbol.for("IHttpServiceClient"))
        .toConstantValue(new HttpServiceClient());
    }

    private registerApis() {
        this._container.bind<IResourceApi>(Symbol.for("IResourceApi")).to(ResourceApi).inRequestScope();
    }

    /**
     * Get Container
     * @returns Container
     */
    public get container(): Container {
        return this._container;
    }
}