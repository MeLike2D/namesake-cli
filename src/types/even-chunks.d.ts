declare module "even-chunks" {
  export type ChunkMethod = 0 | 1 | 2 | 3 | 4;

  function chunk (input: T[], chunks: number, method: ChunkMethod): Array<T[]>
  chunk.CONTIGUOUS = 0 as const;
  chunk.ROUND_ROBIN = 1 as const;
  chunk.PRIORITIZE_FIRST = 2 as const;
  chunk.PRIORITIZE_CENTER = 3 as const;
  chunk.PRIORITIZE_LAST = 4 as const;

  export = chunk;
}