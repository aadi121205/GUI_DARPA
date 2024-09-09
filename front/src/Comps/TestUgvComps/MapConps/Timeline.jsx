import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled } from '@mui/system';

const HorizontalTimeline = styled(Timeline)({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
});

const HorizontalTimelineItem = styled(TimelineItem)({
  flex: '1 1 auto',
  minWidth: '200px', // Adjust based on your needs
});

export default function ColorsTimeline() {
  return (
    <HorizontalTimeline position="alternate">
      <HorizontalTimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
        </TimelineSeparator>
        <TimelineContent>Secondary</TimelineContent>
        <TimelineSeparator>
          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Success</TimelineContent>
        <TimelineSeparator>
          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Success</TimelineContent>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
        </TimelineSeparator>
        <TimelineContent>Secondary</TimelineContent>
        <TimelineSeparator>
          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Success</TimelineContent>
      </HorizontalTimelineItem>
    </HorizontalTimeline>
  );
}
