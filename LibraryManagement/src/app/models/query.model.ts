import { cloneDeep, merge } from "lodash"

export interface IQueryResponse<T> {
    status: string;
    data?: T;
}

export interface IQueryData {
    url?: string,
    controller: string
    op?: string
    data?: any
}

export class QueryData implements IQueryData {
    url!: string;
    controller!: string
    op?: string
    data: any
    constructor(proto: IQueryData) {
        merge(this, cloneDeep(proto));
    }
}