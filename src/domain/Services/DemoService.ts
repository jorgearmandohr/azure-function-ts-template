import { injectable } from "inversify";
import { IDemoService } from "../Contracts/IDemoService";

@injectable()
export default class DemoService implements IDemoService{
    greet(): string {
        return "Hello";
    }
    
}