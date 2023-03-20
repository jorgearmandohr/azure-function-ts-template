import { Logger } from "@azure/functions";
import ILogService from "../../../domain/Contracts/ILogService";
import { injectable } from "inversify";

@injectable()
export default class LogService implements ILogService {

    /**
     * register info logs bounded to the function
     * @param args comma separated array of arguments
     */
    public info = (...args: any[]) : void => {
        console.info(args);
    }
}
