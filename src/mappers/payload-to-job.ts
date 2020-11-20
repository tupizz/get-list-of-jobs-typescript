import { parse } from 'date-fns';

import { ValidationError } from '../errors/validation.error';
import { JobDto, Payload } from '../model/index.model';
import { payloadSchema } from './schemas/payload-schema';

export class MapPayloadToJob {
  private static getDateFromPayload(date: string) {
    return parse(date, 'yyyy-MM-dd kk:mm:ss', new Date(date));
  }

  private static validate(payload: Payload) {
    return payloadSchema.validate(payload);
  }

  static transform(payload: Payload): JobDto {
    const { error } = this.validate(payload);
    if (error) {
      throw new ValidationError();
    }

    return {
      description: payload['Descrição'],
      estimatedHoursToFinish: parseInt(payload['Tempo estimado'].split(' ')[0]),
      id: payload['ID'],
      maxDateToFinish: this.getDateFromPayload(payload['Data Máxima de conclusão']),
    };
  }
}
