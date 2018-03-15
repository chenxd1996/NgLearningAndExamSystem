import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()

export class EncryptService {
  constructor() {

  }
  public encrypt(rawPassword : string) : string {
    return Md5.hashStr(rawPassword).toString();
  }
}
