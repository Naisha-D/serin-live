import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

// Each user's realtime presence (for cursor position, their role, their color)
export type Presence = {
  cursor: { x: number; y: number } | null;
  role: "talent" | "organization" | null;
  color: string;
  reaction: string | null;
};

// Shared state visible to all users (for reaction counts, thought stream)
export type Storage = {
  thoughtStream: LiveList<string>;
  featureHovers: LiveObject<{
    feature1: number;
    feature2: number;
    feature3: number;
    feature4: number;
  }>;
  reactionCounts: LiveObject<{
    fast: number;
    fair: number;
    smart: number;
    impressed: number;
  }>;
  betaJoinCount: number;
};

//Identity info of each user
export type UserMeta = {
  id: string;
  info: {
    name: string;
    color: string;
    role: "talent" | "organization" | null;
  };
};

//custom broadcast events b/w users
export type RoomEvent = {
  type: "THOUGHT_ADDED";
  message: string;
};

export const {
  RoomProvider,
  useMyPresence,
  useOthers,
  useStorage,
  useMutation,
  useEventListener,
  useBroadcastEvent,
  useSelf,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);