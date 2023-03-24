import { Logger } from "@azure/functions";
import { inject, injectable } from "inversify";
import ILogService from "../../../domain/Contracts/ILogService";

@injectable()
export default class LogService implements ILogService {
    private _logger: Logger;

    constructor(logger: Logger = null) {
        this._logger = logger;
    }

    public info(...args: any[]): void {
        this.print(args, 'info');
    }

    public error(...args: any[]): void {
        this.print(args, 'error');
    }

    public warn(...args: any[]): void {
        this.print(args, 'warn');
    }

    private print(args: any[], type: string): void {
        if (this._logger) {
            this._logger[type](args);
        } else {
            console[type](args);
        }
    }
}
