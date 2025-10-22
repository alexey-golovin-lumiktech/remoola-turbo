import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { IDatasourceQuerySearchResult, SearchResult } from './dto';
import { UserRole } from '../shared';

@Injectable()
export class SearchService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async globalSearch(q: string) {
    const like = `${q.toLowerCase()}%`;

    const adminsQuery = this.dataSource.query<IDatasourceQuerySearchResult[]>(
      `SELECT id
            , name
      FROM public.user
      WHERE role = 'admin'
        AND (LOWER(name) ILIKE $1 OR LOWER(email) ILIKE $1)
      LIMIT 5`,
      [like],
    );

    const clientsQuery = this.dataSource.query<IDatasourceQuerySearchResult[]>(
      `SELECT id
            , name AS name
      FROM public.user
      WHERE role = 'client'
        AND (LOWER(name) ILIKE $1 OR LOWER(email) ILIKE $1)
      LIMIT 5`,
      [like],
    );

    const [admins, clients] = await Promise.all([adminsQuery, clientsQuery]);

    return [
      ...admins.map((a) => ({ ...a, type: UserRole.ADMIN, href: `/admins/${a.id}` })),
      ...clients.map((c) => ({ ...c, type: UserRole.CLIENT, href: `/clients/${c.id}` })),
    ] satisfies SearchResult[];
  }
}
