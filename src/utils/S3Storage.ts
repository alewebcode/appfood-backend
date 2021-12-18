import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import multerConfig from '../config/upload';

class S3Storage {
  private client:S3;

  constructor(){
    this.client = new aws.S3({
      region: 'us-east-1'
    })
  }

  async saveFile(filename: string): Promise<void>{
    const originalPath = path.resolve(multerConfig.directory,filename)

    const ContentType = mime.getType(originalPath);

    if(!ContentType){
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client.putObject({
      Bucket:'images-tdt',
      Key:filename,
      //ACL:'public-read',
      Body:fileContent,
      ContentType
    })
    .promise();
  }
}

export default S3Storage;