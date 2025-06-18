import { access, mkdir, writeFile, readFile, rm, readdir } from 'fs/promises';
import { constants, stat } from 'fs';
import { join } from 'path';
import { env } from '$env/dynamic/private';

let storage;
export let quizdir;
export let submissiondir;
export let idfile;

export async function initStorage() {
  storage = env.STORAGE;
  quizdir = join(storage,'quizes');
  submissiondir = join(storage, 'submissions');
  idfile = join(storage, 'id.json');

  let exists = await checkPath(quizdir);
  if (!exists)
    await mkdir(quizdir);
  
  exists = await checkPath(submissiondir);
  if (!exists)
    await mkdir(submissiondir);

  exists = await checkPath(idfile);
  if (!exists)
    write(idfile, { nxtId: 100001 });
}

export async function read(dir) {
  const data = await readFile(dir, 'utf-8');
  return JSON.parse(data);
}

export async function write(dir, data) {
  await writeFile(dir, JSON.stringify(data, null, 2));
}

export async function makedir(dir) {
  await mkdir(dir);
}

export function quizPath(id) {
  return join(storage, 'quizes', id + ".json");
}

export function submissionPath(id, userId) {
  return join(submissiondir, id, userId + '.json');
}

export function submissionDir(id) {
  return join(submissiondir, id.toString());
}

export async function checkPath(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }  
}

export async function deleteFile(path) {
  await rm(path);
}

export async function deleteFolder(path) {
  await rm(path, { recursive: true, force: true });
}

export async function getFiles(dir) {
  return (await readdir(dir)).map(file => join(dir, file));
}