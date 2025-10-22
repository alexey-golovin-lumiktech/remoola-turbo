import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';

import { Contractor } from '../contractors/contractor.entity';
import { Contract } from '../contracts/contract.entity';
import { Document } from '../documents/document.entity';
import { Payment } from '../payments/payment.entity';
import { IUserRole, UserRole } from '../shared';
import { User } from '../users/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Contractor) private contractorRepository: Repository<Contractor>,
    @InjectRepository(Contract) private contractRepository: Repository<Contract>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
  ) {}

  searchAdmins(query?: string) {
    const options: FindManyOptions<User> = { order: { createdAt: `DESC` } };
    const role = UserRole.ADMIN;

    if (query) {
      options.where = [
        { role, email: ILike(`%${query}%`) },
        { role, name: ILike(`%${query}%`) },
      ];
    } else options.where = { role };

    return this.userRepository.find(options);
  }

  getAdminById(adminId: string) {
    return this.userRepository.findOne({
      where: { role: UserRole.ADMIN, id: adminId },
    });
  }

  searchClients(query?: string) {
    const options: FindManyOptions<User> = { order: { createdAt: `DESC` } };
    const role = UserRole.CLIENT;

    if (query) {
      options.where = [
        { role, email: ILike(`%${query}%`) },
        { role, name: ILike(`%${query}%`) },
      ];
    } else options.where = { role };

    return this.userRepository.find(options);
  }

  getClientById(clientId: string) {
    return this.userRepository.findOne({
      where: { role: UserRole.CLIENT, id: clientId },
    });
  }

  listUsers(query?: string) {
    const where = query ? [{ email: ILike(`%${query}%`) }, { name: ILike(`%${query}%`) }] : undefined;
    return this.userRepository.find({ where, order: { createdAt: `DESC` } });
  }

  setRole(userId: string, body: { role: IUserRole }) {
    return this.userRepository.update({ id: userId }, { role: body.role });
  }

  listContractors(query?: string) {
    return this.contractorRepository.find({
      where: query ? { name: ILike(`%${query}%`) } : {},
      order: { createdAt: `DESC` },
    });
  }

  createContractor(body: { name: string; email?: string; phone?: string }) {
    return this.contractorRepository.save(this.contractorRepository.create(body));
  }

  updateContractor(contractorId: string, body: Partial<Contractor>) {
    return this.contractorRepository.update({ id: contractorId }, body);
  }

  deleteContractor(contractorId: string) {
    return this.contractorRepository.delete({ id: contractorId });
  }

  listContracts() {
    return this.contractRepository.find({ order: { updatedAt: `DESC` } });
  }

  updateContract(contractId: string, b: Partial<Contract>) {
    return this.contractRepository.update({ id: contractId }, b);
  }

  deleteContract(contractId: string) {
    return this.contractRepository.delete({ id: contractId });
  }

  listPayments() {
    return this.paymentRepository.find({ order: { createdAt: `DESC` } });
  }

  deletePayment(paymentId: string) {
    return this.paymentRepository.delete({ id: paymentId });
  }

  listDocuments(query?: string) {
    return this.documentRepository.find({
      where: query ? { name: ILike(`%${query}%`) } : {},
      order: { updatedAt: `DESC` },
    });
  }

  deleteDocument(documentId: string) {
    return this.documentRepository.delete({ id: documentId });
  }
}
