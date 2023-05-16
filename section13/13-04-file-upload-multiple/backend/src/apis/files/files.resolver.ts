import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => [String])
  uploadFile(
    // 브라우저에서 파일 받아옴
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
    // typescript타입과 graphql타입이 다를 경우, name과 type을 따로 지정
  ): Promise<string[]> {
    return this.filesService.upload({ files });
  }
}
