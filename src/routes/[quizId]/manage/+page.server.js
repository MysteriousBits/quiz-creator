import { loadQuiz } from '$lib/server/api.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, cookies }) {
  const data = await loadQuiz(params.quizId, false);

  if (!data) error(404, "Quiz not found");

  if (data.curUser !== cookies.get('userid')) return redirect(302, "/manage/" + params.quizId);

  const { uid, infos, requiredFields, questions } = data;
  return { uid, infos, requiredFields, questions };
}