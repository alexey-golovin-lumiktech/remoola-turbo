import { type Provider } from '@nestjs/common';

import { AdminService } from './admin.service';
import { SearchService } from './search.service';

export const providers = [AdminService, SearchService] satisfies Provider[];
