import { env } from '$env/dynamic/private';
import { createClient } from '@supabase/supabase-js'

export const idfile = "id.json";
const quizdir = "quizzes";
const submissiondir = "submissions";
let bucket;
let supabase;

export async function initStorage() {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_KEY;
  supabase = createClient(supabaseUrl, supabaseKey);
  
  bucket = env.SUPABASE_BUCKET;

  let exists = await checkPath(idfile);
  if (!exists)
    write(idfile, { nxtId: 100001 });

  console.log("Initiated");
}

export async function read(path) {
  const { data, error } = await supabase
  .storage
  .from(bucket)
  .download(path);

  if (error) return null;
  return JSON.parse(await data.text());
}

export async function write(path, obj) {
  const file = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const { error } = await supabase
  .storage
  .from(bucket)
  .upload(path, file, {
    upsert: true
  });
  
  if (error) throw error;
  return true;
}

export async function makedir(dir) {
  await write(dir + '/folder.json', {});
}

export function quizPath(id) {
  return quizdir + '/' + String(id) + '.json';
}

export function submissionPath(id, userId) {
  return [submissiondir, String(id), userId + '.json'].join('/');
}

export function submissionDir(id) {
  return submissiondir + '/' + String(id);
}

export async function checkPath(path) {
  const { data, error } = await supabase
  .storage
  .from(bucket)
  .exists(path);

  return data;
}

export async function checkDir(dir) {
  dir += "/folder.json";
  return await checkPath(dir);
}

export async function deleteFile(path) {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .remove([path]);

    if (error) throw error;
    return true;
}

export async function deleteFolder(path) {
  const files = await getFiles(path);

  const { error } = await supabase
    .storage
    .from(bucket)
    .remove(files);

    if (error) throw error;
    return true;
}

export async function getFiles(dir) {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .list(dir);

  if (error) throw error;

  return data.map(file => `${dir}/${file.name}`);
}