/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerListUsers({
        q,
    }: {
        q: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admins/users',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerSetRole({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admins/users/{id}/role',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerListContractors({
        q,
    }: {
        q: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admins/contractors',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerCreateContractor(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admins/contractors',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerUpdateContractor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admins/contractors/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerDeleteContractor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admins/contractors/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerListContracts(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admins/contracts',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerUpdateContract({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admins/contracts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerDeleteContract({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admins/contracts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerListPayments(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admins/payments',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerDeletePayment({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admins/payments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerListDocuments({
        q,
    }: {
        q: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admins/documents',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminsControllerDeleteDocument({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admins/documents/{id}',
            path: {
                'id': id,
            },
        });
    }
}
