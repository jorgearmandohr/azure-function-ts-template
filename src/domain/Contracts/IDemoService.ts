import { injectable } from "inversify";

export interface IDemoService{
    greet(param: string) : Promise<string>;
}