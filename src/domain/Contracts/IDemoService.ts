import { injectable } from "inversify";

export interface IDemoService{
    greet() : string;
}