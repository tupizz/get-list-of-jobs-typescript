import { parse } from 'date-fns';

import { orderByPriority } from '../../src/utils/order-by-priority';

describe('Order by priority', () => {
  test('given a list of jobs should order by the most priority to the less', () => {
    const start = parse('2019-11-10 09:00:00', 'yyyy-MM-dd kk:mm:ss', new Date('2019-11-10 09:00:00'));

    const payload = [
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
    ];

    const result = orderByPriority(start, payload);

    expect(result).toBeTruthy();
    expect(result).toStrictEqual([
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
    ]);
  });
});
