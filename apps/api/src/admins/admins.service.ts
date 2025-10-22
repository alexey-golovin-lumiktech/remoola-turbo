import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Contractor } from '../contractors/contractor.entity';
import { Contract } from '../contracts/contract.entity';
import { Document } from '../documents/document.entity';
import { Payment } from '../payments/payment.entity';
import { IUserRole } from '../shared';
import { User } from '../users/user.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Contractor) private contractors: Repository<Contractor>,
    @InjectRepository(Contract) private contracts: Repository<Contract>,
    @InjectRepository(Payment) private payments: Repository<Payment>,
    @InjectRepository(Document) private documents: Repository<Document>,
  ) {}

  listUsers(query?: string) {
    const where = query ? [{ email: ILike(`%${query}%`) }, { name: ILike(`%${query}%`) }] : undefined;
    return this.users.find({ where, order: { createdAt: `DESC` } });
  }

  setRole(id: string, body: { role: IUserRole }) {
    return this.users.update({ id }, { role: body.role });
  }

  listContractors(query?: string) {
    return this.contractors.find({ where: query ? { name: ILike(`%${query}%`) } : {}, order: { createdAt: `DESC` } });
  }

  createContractor(body: { name: string; email?: string; phone?: string }) {
    return this.contractors.save(this.contractors.create(body));
  }

  updateContractor(id: string, body: Partial<Contractor>) {
    return this.contractors.update({ id }, body);
  }

  deleteContractor(id: string) {
    return this.contractors.delete({ id });
  }

  listContracts() {
    return this.contracts.find({ order: { updatedAt: `DESC` } });
  }

  updateContract(id: string, b: Partial<Contract>) {
    return this.contracts.update({ id }, b);
  }

  deleteContract(id: string) {
    return this.contracts.delete({ id });
  }

  listPayments() {
    return this.payments.find({ order: { createdAt: `DESC` } });
  }

  deletePayment(id: string) {
    return this.payments.delete({ id });
  }

  listDocuments(query?: string) {
    return this.documents.find({ where: query ? { name: ILike(`%${query}%`) } : {}, order: { updatedAt: `DESC` } });
  }

  deleteDocument(id: string) {
    return this.documents.delete({ id });
  }
}
