import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Item')
export class ItemResolver {
  @Query((returns) => String)
  async item(): Promise<string> {
    return 'Hello world!';
  }
}
