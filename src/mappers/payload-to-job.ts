import { parse } from 'date-fns';
import * as Joi from 'joi';

import { ValidationError } from '../errors/validation.error';
import { JobDto, Payload } from '../model/index.model';

export class MapPayloadToJob {
  private static getDateFromPayload(date: string) {
    return parse(date, 'yyyy-MM-dd kk:mm:ss', new Date(date));
  }

  private static validate(payload: Payload) {
    const schema = Joi.object({
      'ID': Joi.number().required(),
      'Descrição': Joi.string().required(),
      'Data Máxima de conclusão': Joi.string()
        .pattern(new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/))
        .required(),
      'Tempo estimado': Joi.string()
        .pattern(new RegExp(/[0-9]{1} horas/))
        .required(),
    });

    return schema.validate(payload);
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
