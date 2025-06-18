import { deleteQuiz, loadQuiz } from '$lib/server/api';
import { json } from '@sveltejs/kit';

export async function GET({ cookies, params }) {
  const quiz = await loadQuiz(params.quizId);

  if (!quiz) return json({ error: "Quiz not found" }, { status: 404 });

  if (quiz.curUser !== cookies.get('userid')) return json({ error: "Access denied" }, { status: 401 });

  const res = await deleteQuiz(params.quizId);

  if (res.error) return json({ error: res.error }, { status: 500 });
  else return json({ success: res.success });
}