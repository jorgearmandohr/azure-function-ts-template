import "reflect-metadata";

import { Container } from "inversify";
import { IDemoService } from "./domain/Contracts/IDemoService";
import DemoService from "./domain/Services/DemoService";
import ResourceApi from "./Infrasctructure/Api/ResourceApi";
import IResourceApi from "./Infrasctructure/Api/IResourceApi";
import IHttpServiceClient from "./domain/Contracts/IHttpServiceClient";
import HttpServiceClient from "./Infrasctructure/ServiceClients/httpServiceClient/HttpServiceClient";
import { Context, Logger } from "@azure/functions";
import ILogService from "./domain/Contracts/ILogService";

export default class Startup {
    private _container: Container;

    constructor(context: Context = null) {
        this._container = new Container();
        this.registerServices();
        this.registerApis();
        this.registerContextDependencies(context);
    }

    /**
     * Get Container
     * @returns Container
     */
    public get container(): Container {
        return this._container;
    }

    /**
     * Get service instance from IoC container
     * @param typeName Type Symbol
     * @returns instance
     */
    public getInstance<T>(typeName: string): T{
        return this._container.get<T>(Symbol.for(typeName));
    }

    /**
     * Binds logger from context
     * @param logger instancia de logger
     */
    private registerContextDependencies(context: Context) {
        if(context){
            this._container.bind<ILogService>(Symbol.for("ILogService")).toConstantValue(context.log);
        }
    }

    private registerServices() {
        this._container.bind<IDemoService>(Symbol.for("IDemoService")).to(DemoService).inRequestScope();
        this._container.bind<IHttpServiceClient>(Symbol.for("IHttpServiceClient"))
            .toConstantValue(new HttpServiceClient());
    }

    private registerApis() {
        this._container.bind<IResourceApi>(Symbol.for("IResourceApi")).to(ResourceApi).inRequestScope();
    }
}
