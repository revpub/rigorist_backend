import { WithId, ObjectId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const TimeEntry = z.object({
  actorId: z.instanceof(ObjectId).or( z.string().transform( ObjectId.createFromHexString ) ),
  dateString: z.string(),
  activityId: z.instanceof(ObjectId).or( z.string().transform( ObjectId.createFromHexString ) ),
  duration: z.number().min(0.0).max(24.0),
  concentrationLevel: z.number().int().min(1).max(5)
});

export type TimeEntry = z.infer<typeof TimeEntry>;
export type TimeEntryWithId = WithId<TimeEntry>;
export const TimeEntries = db.collection<TimeEntry>('timeEntries');