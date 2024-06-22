import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export abstract class BaseService<TDomain, TOrm> {
  constructor(
    protected readonly repository: Repository<TOrm>,
    private readonly toDomain: (entity: TOrm) => TDomain,
    private readonly toOrm: (domain: TDomain) => TOrm,
  ) {}

  async create(createDto: any): Promise<TDomain> {
    const entity = this.toOrm(createDto);
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findAll(options?: FindManyOptions<TOrm>): Promise<TDomain[]> {
    const entities = await this.repository.find({
      ...options,
      relations: this.getRelations(),
    });
    return entities.map(this.toDomain);
  }

  async findOne(id: string, options?: FindOneOptions<TOrm>): Promise<TDomain> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<TOrm>,
      relations: this.getRelations(),
      ...options,
    });
    if (!entity) throw new NotFoundException(`Entity with id ${id} not found`);
    return this.toDomain(entity);
  }

  async update(id: string, updateDto: any): Promise<TDomain> {
    const existingEntity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<TOrm>,
      relations: this.getRelations(),
    });
    if (!existingEntity)
      throw new NotFoundException(`Entity with id ${id} not found`);

    const updatedEntity = this.repository.merge(
      existingEntity,
      this.toOrm(updateDto) as DeepPartial<TOrm>,
    );
    const savedEntity = await this.repository.save(updatedEntity);
    return this.toDomain(savedEntity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<TOrm>,
      relations: this.getRelations(),
    });
    if (!entity) throw new NotFoundException(`Entity with id ${id} not found`);

    await this.repository.delete(id);
  }

  protected getRelations(): string[] {
    return [];
  }
}
