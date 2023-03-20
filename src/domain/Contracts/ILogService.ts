import { Logger } from "@azure/functions";

export default interface ILogService {
    info(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    // setInstance(logger: Logger): void;
}