import moment from 'moment';
export default function splitTimeRangeByInterval(
  ranges: string[],
  intervalHr: number
): string[] {
  const result: string[] = [];

  for (let i = 0; i < ranges.length - 1; i++) {
    const start = moment(ranges[i], ['h:mm A', 'hh:mm A']);
    const end = moment(ranges[i + 1], ['h:mm A', 'hh:mm A']);

    let current = start.clone();

    while (current.isBefore(end)) {
      result.push(current.format('hh:mm A'));
      current.add(intervalHr, 'hours');
    }
  }

  return result;
}
