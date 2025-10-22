/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentListItem } from '../models/DocumentListItem';
import type { UploadDocument } from '../models/UploadDocument';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentsService {
    /**
     * @returns DocumentListItem
     * @throws ApiError
     */
    public static documentsControllerList({
        clientId,
    }: {
        clientId: string,
    }): CancelablePromise<Array<DocumentListItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/documents',
            query: {
                'clientId': clientId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static documentsControllerUpload({
        requestBody,
    }: {
        requestBody: UploadDocument,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/documents',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static documentsControllerPresigned(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/documents/presigned',
        });
    }
}
