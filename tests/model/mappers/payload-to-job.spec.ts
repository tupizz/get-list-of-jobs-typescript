import { Payload } from '../../../src/model/index.model';
import { MapPayloadToJob } from '../../../src/model/mappers/payload-to-job';
import * as invalidPayload from './payload/invalid-payload.json';
import * as validPayload from './payload/valid-payload.json';

describe('Payload to Job', () => {
  test('Given a valid paylod should return a valid job dto model', () => {
    const items = validPayload.map((item: Payload) => MapPayloadToJob.transform(item));
    expect(items).toBeTruthy();
    expect(items).toStrictEqual([
      {
        description: 'Importação de arquivos de fundos',
        estimatedHoursToFinish: 2,
        id: 1,
        maxDateToFinish: new Date('2019-11-10T15:00:00.000Z'),
      },
      {
        description: 'Importação de dados da Base Legada',
        estimatedHoursToFinish: 4,
        id: 2,
        maxDateToFinish: new Date('2019-11-11T15:00:00.000Z'),
      },
      {
        description: 'Importação de dados de integração',
        estimatedHoursToFinish: 6,
        id: 3,
        maxDateToFinish: new Date('2019-11-11T11:00:00.000Z'),
      },
    ]);
  });

  test('Given an invalid paylod should throw an error', () => {
    expect(() => {
      MapPayloadToJob.transform(invalidPayload);
    }).toThrow(Error);
  });
});
