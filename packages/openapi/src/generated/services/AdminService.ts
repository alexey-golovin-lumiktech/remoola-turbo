/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerListUsers({
        q,
    }: {
        q: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/users',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerSetRole({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admin/users/{id}/role',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerListContractors({
        q,
    }: {
        q: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/contractors',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerCreateContractor(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/contractors',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerUpdateContractor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admin/contractors/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerDeleteContractor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/contractors/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerListContracts(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/contracts',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerUpdateContract({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/admin/contracts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerDeleteContract({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/contracts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerListPayments(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/payments',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerDeletePayment({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/payments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerListDocuments({
        q,
    }: {
        q: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/documents',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerDeleteDocument({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/documents/{id}',
            path: {
                'id': id,
            },
        });
    }
}
