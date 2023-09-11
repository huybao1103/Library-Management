import { Route } from "@angular/router";

export declare interface IDialogType {
    uniqueId: string;
    width?: string,
    height?: string
    size?: 'sm' | 'lg' | 'xl';

    dialogInit(para: any | undefined, routeConfig?: Route): void;

}