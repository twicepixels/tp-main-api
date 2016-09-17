import { Request, Response } from "express";
import { Service } from "./base.service";

let parameters = require('../config/parameters');
const _fileSystem = require('fs');
const AWS = require('aws-sdk');
const formidable = require('formidable');


export class AWSService extends Service {

  protected awsBucket:any;
  protected arrayFiles:Array<any> = [];

  constructor(req: Request, res: Response) {
    super(req, res);
    this.init();
  }

  public init(): void{
    this.updateAwsConfig(parameters.awsAccessKeyId, parameters.awsSecretAccessKey, parameters.awsRegion);
  }

  public updateAwsConfig(accessKeyId:string, secretAccessKey:string, awsRegion:string):any{
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = accessKeyId;
    AWS.config.secretAccessKey = secretAccessKey;
    AWS.config.region = awsRegion;
  }

  public transferUloadedFileToS3(file:any):Promise<any>{
    return new Promise((resolve: any, reject: any)=> {
      _fileSystem.readFile(file.path, (err:any, data:any) => {
        if (err) {
          reject(err);
        }else{
          this.uploadFileToS3(data, file.name).then((data:any)=>{
            resolve(data);
          },(error:any)=>{
            reject(error);
          });
        }//end if
      });
    });
  }

  public formidableUploadFiles(req:any):Promise<any>{
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = parameters.filesPath + parameters.folderName;

    return new Promise((resolve: any, reject: any)=> {

      form.on('file', (field:any, file:any)=> {
        this.arrayFiles.push(file);
      });

      form.on('error', (err:any) => {
        reject('error:'+err);
      });

      form.on('end', () => {
        resolve(true);
      });

      form.parse(req);

    });
  }

  public uploadFileToS3(data:any, fileName:any):Promise<any>{
    return new Promise((resolve: any, reject: any)=> {
      this.awsBucket = new AWS.S3();
      let params = { Bucket: parameters.awsBucket, Key: fileName,  Body: data };
      this.awsBucket.putObject(params, (err:any, data:any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }//end if
      });
    });
  }

}

