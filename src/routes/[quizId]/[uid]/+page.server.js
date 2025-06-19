import { getSubmission, loadQuiz } from "$lib/server/api.js";
import { redirect, error } from "@sveltejs/kit";

export async function load({ url, cookies, params }) {
  let userId = cookies.get('userid');
  if (!userId)
    return redirect(302, url + '/start');

  const quiz = await loadQuiz(params.quizId);
  if (!quiz) error(404, "Quiz not found");

  const { uid, infos, questions } = quiz;
  if (uid !== params.uid) error(404, "Not found");

  const { time, score } = await getSubmission(params.quizId, userId);
  
  if (!time) return redirect(302, url + '/start');

  if (score !== undefined) return { error: "Already submitted!" };

  const rem = infos.time * 60000 - (Date.now() - time);
  return { ...infos, questions, rem };
}