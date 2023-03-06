import { Container } from "inversify";
import { IDemoService } from "./domain/Contracts/IDemoService";
import DemoService from "./domain/Services/DemoService";
import ResourceApi from "./Infrasctructure/Api/ResourceApi";
import IResourceApi from "./Infrasctructure/Api/IResourceApi";

export default class startup {
    private _container: Container;

    constructor() {
        this._container = new Container();
        this.registerServices();
        this.registerApis();
    }

    private registerServices() {
        this._container.bind<IDemoService>(Symbol.for("IDemoService")).to(DemoService).inRequestScope();
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