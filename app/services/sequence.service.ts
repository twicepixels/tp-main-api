/**
 * Created by Gabriel on 03/08/2016.
 */
import {Service} from "../../base/base.service";

export class SequenceService extends Service {
  public static create(data:any, next:any) {
    this.Models.Sequence.create(
      data
    ).then(function (sequence:any) {
      // was created successfully!
      next(null, sequence);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static updateBySequenceName(sequenceName:string, data:any, next:any) {
    this.Models.Sequence.update(
      data,
      {where: {"sequenceName": sequenceName}}
    ).then(function (sequence:any) {
      // was created successfully!
      next(null, sequence);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static getSequenceName(sequenceName:string, next:any) {
    this.Models.Sequence.find({
      where: {"sequenceName": sequenceName}
    }).then(function (sequence:any) {
      // was found successfully!
      next(null, sequence);
    }, function (error:any) {
      // error handling
      next(error, null);
    });
  }

  public static getNextSequence(sequenceName:string, next:any) {
    this.Models.Sequence.find({
      where: {"sequenceName": sequenceName}
    }).then(function (sequence:any) {
      // was found successfully!
      let nextSequence = sequence.sequenceNumber + sequence.incrementNumber;
      sequence.sequenceNumber = nextSequence;
      sequence.update();
      next(null, sequence);
    }, function (error:any) {
      // error handling
      let data  = "{\"sequenceName\" : " + sequenceName +
        ", \"sequenceNumber\" : " + 1 +
        ", \"incrementNumber\" : " + 1 +
        " }";
      SequenceService.create(data, next);
    });
  }
}
