export const TOPICS = {
  POST_CREATED: "post.created.v1",
} as const;

export type TopicName = typeof TOPICS[keyof typeof TOPICS];
