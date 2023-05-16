import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  files: FileUpload[];
}
@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];

    // 1. 파일을 클라우드 스토리지에 저장하는 로직
    // 1-1. 스토리지 세팅하기
    const storage = new Storage({
      projectId: 'lithe-hallway-386900',
      keyFilename: 'lithe-hallway-386900-2a89f97e08ad.json',
    }).bucket('codecamp-storage_hj');

    // 1-2. 스토리지에 파일 올리기
    console.time('time');
    const results = [];
    for (let i = 0; i < waitedFiles.length; i++) {
      results[i] = new Promise((resolve, reject) => {
        waitedFiles[i]
          .createReadStream()
          .pipe(storage.file(waitedFiles[i].filename).createWriteStream())
          .on('finish', () => resolve('성공'))
          .on('error', () => reject('실패'));
      });
    }
    console.timeEnd('time');

    console.log('파일 전송이 완료되었습니다.');
    return ['끝', '끝'];
  }
}
