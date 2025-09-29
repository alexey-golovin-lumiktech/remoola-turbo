import { OpenAPI, ContractsService, PaymentsService, DocumentsService, DashboardService, AuthService } from '@remoola/openapi';

export function configureOpenAPI(getToken: () => string | undefined) {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL || `http://127.0.0.1:3333/api`;
  OpenAPI.TOKEN = getToken(); // automatically called before each request
  OpenAPI.WITH_CREDENTIALS = true;
  OpenAPI.CREDENTIALS = `include`;
}

export { ContractsService, PaymentsService, DocumentsService, DashboardService, AuthService };
