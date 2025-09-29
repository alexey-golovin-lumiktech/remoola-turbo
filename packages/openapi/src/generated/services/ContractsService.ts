/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateContract } from '../models/CreateContract';
import type { UpdateContract } from '../models/UpdateContract';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContractsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static contractsControllerList({
        clientId,
        search,
    }: {
        clientId: string,
        search: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contracts',
            query: {
                'clientId': clientId,
                'search': search,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static contractsControllerCreate({
        requestBody,
    }: {
        requestBody: CreateContract,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contracts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static contractsControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateContract,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/contracts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
