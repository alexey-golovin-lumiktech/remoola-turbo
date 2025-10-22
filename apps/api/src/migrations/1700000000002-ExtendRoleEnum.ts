import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class ExtendRoleEnum1700000000002 implements MigrationInterface {
  name = `ExtendRoleEnum1700000000002`;
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TYPE "public"."user_role_enum" ADD VALUE IF NOT EXISTS 'superadmin'`);
  }
  public async down(): Promise<void> {
    /* no-op: enum value removal is unsafe */
  }
}
