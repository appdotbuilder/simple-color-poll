import { z } from 'zod';

// Vote option enum
export const voteOptionSchema = z.enum(['Blue', 'Red']);
export type VoteOption = z.infer<typeof voteOptionSchema>;

// Vote schema
export const voteSchema = z.object({
  id: z.number(),
  option: voteOptionSchema,
  created_at: z.coerce.date()
});

export type Vote = z.infer<typeof voteSchema>;

// Input schema for casting a vote
export const castVoteInputSchema = z.object({
  option: voteOptionSchema
});

export type CastVoteInput = z.infer<typeof castVoteInputSchema>;

// Vote results schema for displaying voting statistics
export const voteResultsSchema = z.object({
  blue_votes: z.number().int().nonnegative(),
  red_votes: z.number().int().nonnegative(),
  total_votes: z.number().int().nonnegative()
});

export type VoteResults = z.infer<typeof voteResultsSchema>;

// Poll information schema
export const pollInfoSchema = z.object({
  topic: z.string(),
  options: z.array(voteOptionSchema)
});

export type PollInfo = z.infer<typeof pollInfoSchema>;