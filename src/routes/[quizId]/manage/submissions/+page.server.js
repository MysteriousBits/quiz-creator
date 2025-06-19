import { getAllSubmissions, loadQuiz } from '$lib/server/api';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
  const data = await loadQuiz(params.quizId);

  if (!data) error(404, "Quiz not found");

  if (data.curUser !== cookies.get('userid')) return redirect(302, "/manage/" + params.quizId);

  const res = await getAllSubmissions(params.quizId);

  if (res.error) error(500, res.error);

  return { requiredFields: data.requiredFields, submissions: res.submissions };
}