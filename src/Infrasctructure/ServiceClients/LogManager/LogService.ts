import { Logger } from "@azure/functions";
import { injectable } from "inversify";
import ILogService from "../../../domain/Contracts/ILogService";

@injectable()
export default class LogService implements ILogService {
    private _logger: Logger;
    constructor(logger: Logger) {
        this._logger = logger;
    }

    info(...args: any[]): void {
        this._logger.info(args);
    }

    error(...args: any[]): void {
        this._logger.error(args);
    }

    warn(...args: any[]): void {
        this._logger.warn(args);
    }

    // public setInstance(logger: Logger): void {
    //     if (!this._logger) {
    //         this._logger = logger;
    //     }
    // }
}
