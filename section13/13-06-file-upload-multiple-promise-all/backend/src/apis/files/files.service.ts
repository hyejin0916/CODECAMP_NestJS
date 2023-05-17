import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    // const waitedFiles = [];
    // waitedFiles[0] = await files[0];
    // waitedFiles[1] = await files[1];
    // 아래처럼 한줄로 한방에 가능
    const waitedFiles = await Promise.all(files);

    console.log(waitedFiles); // [File, File]

    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const bucket = 'codecamp-storage_hj';
    const storage = new Storage({
      projectId: 'lithe-hallway-386900',
      keyFilename: 'lithe-hallway-386900-2a89f97e08ad.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기
    console.time('time');
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            const validFilename = el.filename.replace(
              /[\x00-\x1F\x7F-\x9F]/g,
              '',
            );
            el.createReadStream()
              .pipe(storage.file(validFilename).createWriteStream())
              // pipe는 Readable스트림과 Writable스트림을 연결
              .on('finish', () => resolve(`${bucket}/${validFilename}`)) // 'finish' 이벤트
              .on('error', (error) => reject(error)); // 'error' 이벤트
          }),
      ),
    );
    console.timeEnd('time');

    // 2. 다운로드URL 브라우저에 돌려주기
    return results;
  }
}
