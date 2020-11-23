import { ValidationError } from '../errors/validation.error';
import { JobDto, Payload } from '../model/index.model';
import { getParsedDate } from '../utils/date-utils';
import { payloadSchema } from './schemas/payload-schema';

export const payloadToJobDto = (payload: Payload): JobDto => {
  const { error } = payloadSchema.validate(payload);
  if (error) {
    throw new ValidationError();
  }

  return {
    description: payload['Descrição'],
    estimatedHoursToFinish: parseInt(payload['Tempo estimado'].split(' ')[0]),
    id: payload['ID'],
    maxDateToFinish: getParsedDate(payload['Data Máxima de conclusão']),
  };
};
