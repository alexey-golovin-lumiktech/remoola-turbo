import { Provider } from '@nestjs/common';

import { AdminsService } from './admins.service';

export const providers = [AdminsService] satisfies Provider[];
