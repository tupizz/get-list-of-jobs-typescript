import { ValidationError } from '../errors/validation.error';
import { JobDto, Payload } from '../model/index.model';
import { DateUtils } from '../utils/date-utils';
import { payloadSchema } from './schemas/payload-schema';

export class MapPayloadToJob {
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
      maxDateToFinish: DateUtils.getParsedDate(payload['Data Máxima de conclusão']),
    };
  }
}
