import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  file: FileUpload;
}
@Injectable()
export class FilesService {
  upload({ file }: IFilesServiceUpload): string {
    console.log(file);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직
    // 1-1. 스토리지 세팅하기
    const storage = new Storage({
      projectId: 'lithe-hallway-386900',
      keyFilename: 'lithe-hallway-386900-2a89f97e08ad.json',
    }).bucket('codecamp-storage_hj');
    // 1-2. 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createWriteStream())
      .on('finish', () => {
        console.log('성공');
      })
      .on('error', () => {
        console.log('실패');
      });

    console.log('파일 전송이 완료되었습니다.');
    return '끝';
  }
}
