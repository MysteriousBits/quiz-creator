import { success } from '$lib/stores/store.svelte';
import * as storage from './cloudstorage';
import { isCached, updateSaved } from './store';

export function init() {
  storage.initStorage();
}

export async function nxtId() {
  const { nxtId } = await storage.read(storage.idfile, false);
  await storage.write(storage.idfile, { nxtId: nxtId + 1 });
  return nxtId;
}

export async function createQuiz(userId, id, uid, pass) {
  await storage.write(storage.quizPath(id), { uid: uid, pass: pass, curUser: userId,
    infos: {
      title: "Untitled", time: 5, desc: ""
    },
    requiredFields: ["Name", "Roll"],
    questions: [{ id: 0, txt: "1 + 1 = ?", options: [0, 2, 10, 42], ans : 2 }]
   });

   await storage.makedir(storage.submissionDir(id));
}

export async function saveQuiz(id, data, quiz = undefined) {
  if (!quiz) data = await loadQuiz(id);
  if (!quiz) return false;

  await storage.write(storage.quizPath(id), { ...quiz, ...data });
  updateSaved(id);
  return true;
}

export async function loadQuiz(id, cache = true) {
  if (!(await quizExists(id))) return null;

  if (cache) cache = !isCached(id);
  return await storage.read(storage.quizPath(id), cache);
}

export async function quizExists(id) {
  return await storage.checkPath(storage.quizPath(id));
}

export async function startQuiz(id, userId, requiredFields) {
  await storage.write(storage.submissionPath(id, userId), {
    requiredFields, time: Date.now() + 5000
  });
}

export async function getSubmission(id, userId) {
  const path = storage.submissionPath(id, userId);
  if (!(await storage.checkPath(path))) return {};

  const submission = await storage.read(path);
  return submission;
}

export async function evaluateSubmission(id, userId, ans) {
  const quiz = await loadQuiz(id);
  if (!quiz) return { error: "Quiz not found" };

  const path = storage.submissionPath(id, userId);
  if (!(await storage.checkPath(path)))
    return { error: "No submission entry found" };

  const submission = await storage.read(path);
  if (submission?.score !== undefined) return { error: "Already submitted" };

  if (Date.now() - submission.time > quiz.infos.time * 60000 + 15000) return { error: "Time's up!" }
  if (quiz.questions.length !== ans.length) return { error: "Invalid submission" };

  let score = 0;
  ans.forEach((submitted, i) => {
    score += submitted === quiz.questions[i].ans;
  });

  await storage.write(path, { ...submission, score });
  return { success: "Accepted" };
}

export async function deleteQuiz(id) {
  let path = storage.quizPath(id);
  if (!(await storage.checkPath(path))) return { error: "Quiz not found" };

  await storage.deleteFile(path);

  path = storage.submissionDir(id);
  await storage.deleteFolder(path);

  return { success: "Deleted successfully" };
}

export async function getAllSubmissions(id) {
  const path = storage.submissionDir(id);
  if (!(await storage.checkDir(path))) return { error: "Not found" };

  const files = await storage.getFiles(path);
  let submissions = [];

  for (const file of files) {
    const { requiredFields, score } = await storage.read(file);
    if (score !== undefined) submissions.push({ requiredFields, score });
  }

  return { submissions };
}