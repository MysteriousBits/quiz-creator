import { nxtId } from "./api";

let creating = new Map();
let lastSaved = new Map();

function fitSize(mp, size) {
  if (mp.size >= size) mp.delete(mp.keys().next().value);
}

export async function getAvaiableId(userId) {
    fitSize(creating, 1000);
    
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

export function isCached(id) {
  if (!lastSaved.has(id)) return false;
  
  return Date.now() - lastSaved.get(id) < 60000;
}

export function updateSaved(id) {
  fitSize(lastSaved, 1000);
  lastSaved.set(id, Date.now());
}