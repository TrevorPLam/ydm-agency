// Query builder for reports
export class QueryBuilder {
  private filters: any[] = [];

  addFilter(field: string, operator: string, value: any): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  build(): any {
    return {
      filters: this.filters,
    };
  }
}
