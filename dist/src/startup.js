"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const DemoService_1 = require("./domain/Services/DemoService");
const ResourceApi_1 = require("./Infrasctructure/Api/ResourceApi");
class startup {
    constructor() {
        this._container = new inversify_1.Container();
        this.registerServices();
        this.registerApis();
    }
    registerServices() {
        this._container.bind(Symbol.for("IDemoService")).to(DemoService_1.default).inRequestScope();
    }
    registerApis() {
        this._container.bind(Symbol.for("IResourceApi")).to(ResourceApi_1.default).inRequestScope();
    }
    get container() {
        return this._container;
    }
}
exports.default = startup;
//# sourceMappingURL=startup.js.map