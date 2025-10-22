import { type Provider } from '@nestjs/common';

import { AdminsService } from './admins.service';
import { SearchService } from './search.service';

export const providers = [AdminsService, SearchService] satisfies Provider[];
