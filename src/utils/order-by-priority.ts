import { differenceInHours } from 'date-fns';

import { JobDto } from '../model/job-dto.model';

export const orderByPriority = (start: Date, jobs: JobDto[]) => {
  return jobs.sort((aJob: JobDto, bJob: JobDto) => {
    const maxHoursToFinishJobA = differenceInHours(aJob.maxDateToFinish, start);
    const maxHoursToFinishJobB = differenceInHours(bJob.maxDateToFinish, start);
    return maxHoursToFinishJobA < maxHoursToFinishJobB ? -1 : 1;
  });
};
