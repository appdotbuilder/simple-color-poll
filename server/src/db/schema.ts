import { serial, text, pgTable, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Define the vote options as a PostgreSQL enum
export const voteOptionEnum = pgEnum('vote_option', ['Blue', 'Red']);

// Votes table to store all cast votes
export const votesTable = pgTable('votes', {
  id: serial('id').primaryKey(),
  option: voteOptionEnum('option').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type Vote = typeof votesTable.$inferSelect; // For SELECT operations
export type NewVote = typeof votesTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { votes: votesTable };