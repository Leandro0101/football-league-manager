import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plaintext, salt);
  }
}
