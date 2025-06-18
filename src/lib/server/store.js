import { nxtId } from "./api";

let creating = new Map();

export async function getAvaiableId(userId) {
    if (creating.size > 1000) creating.delete(creating.keys().next().value);
    
    if (creating.has(userId)) return creating.get(userId);
    
    creating.set(userId, await nxtId());
    return creating.get(userId);
}

export function clearId(userId) {
  if (!creating.has(userId)) return null;

  const id = creating.get(userId);
  creating.delete(userId);

  return id;
}