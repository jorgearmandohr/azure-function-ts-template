import { injectable } from "inversify";

export interface IDemoService{
    greet() : Promise<string>;
}