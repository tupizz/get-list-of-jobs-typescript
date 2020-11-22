import { chunkItemsIdByMaxTimeOfDay } from '../../src/utils/chunk-items-by-max-time';

describe('Chunk items by max time', () => {
  test('Given an ordered by priority array should return chunked array by max time with lenght equals to 2', () => {
    const payload = [
      {
        description: 'Importação de arquivos de fundos',
        estimatedHoursToFinish: 2,
        id: 1,
        maxDateToFinish: new Date('2019-11-10T15:00:00.000Z'),
      },
      {
        description: 'Importação de dados de integração',
        estimatedHoursToFinish: 6,
        id: 3,
        maxDateToFinish: new Date('2019-11-11T11:00:00.000Z'),
      },
      {
        description: 'Importação de dados da Base Legada',
        estimatedHoursToFinish: 4,
        id: 2,
        maxDateToFinish: new Date('2019-11-11T15:00:00.000Z'),
      },
    ];
    const result = chunkItemsIdByMaxTimeOfDay(8, payload);

    expect(result).toHaveLength(2);
    expect(result).toStrictEqual([[1, 3], [2]]);
  });

  test('Given an ordered by priority array should return chunked array by max time with lenght equals to 1', () => {
    const payload = [
      {
        description: 'Importação de arquivos de fundos',
        estimatedHoursToFinish: 2,
        id: 1,
        maxDateToFinish: new Date('2019-11-10T15:00:00.000Z'),
      },
      {
        description: 'Importação de dados de integração',
        estimatedHoursToFinish: 2,
        id: 3,
        maxDateToFinish: new Date('2019-11-11T11:00:00.000Z'),
      },
      {
        description: 'Importação de dados da Base Legada',
        estimatedHoursToFinish: 4,
        id: 2,
        maxDateToFinish: new Date('2019-11-11T15:00:00.000Z'),
      },
    ];
    const result = chunkItemsIdByMaxTimeOfDay(8, payload);

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([[1, 3, 2]]);
  });
});
