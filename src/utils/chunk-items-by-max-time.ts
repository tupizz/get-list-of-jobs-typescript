import { JobDto } from '../model/job-dto.model';

export const chunkItemsIdByMaxTimeOfDay = (maxTime: number, jobs: JobDto[]) => {
  const chunked = [];
  let indexChunk = 0;
  let hoursAccumulatorOfDay = 0;

  for (const item of jobs) {
    if (hoursAccumulatorOfDay + item.estimatedHoursToFinish > maxTime) {
      indexChunk += 1;
      hoursAccumulatorOfDay = 0;
    }

    hoursAccumulatorOfDay += item.estimatedHoursToFinish;
    chunked[indexChunk] = chunked[indexChunk] ? [...chunked[indexChunk], item.id] : [item.id];
  }

  return chunked;
};
