export interface DomainService {
  execute(...args: unknown[]): Promise<void>
}

export abstract class BaseDomainService implements DomainService {
  abstract execute(...args: unknown[]): Promise<void>
}
