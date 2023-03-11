"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const startup_1 = require("../src/startup");
const appStartup = new startup_1.default();
const api = appStartup.container.get(Symbol.for('IResourceApi'));
const run = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Running function demo ${context.invocationId}  with request data: `, context.req);
        let response = yield api.get(req);
        context.res.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'my-custom-header': 'isOk',
        };
        context.res.status = 200;
        context.res.body = response;
    });
};
module.exports = run.bind(this);
