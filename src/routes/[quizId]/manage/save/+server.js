import { loadQuiz, saveQuiz } from "$lib/server/api.js";
import { json } from "@sveltejs/kit";

export async function POST({ request, params, cookies }) {
  const { infos, requiredFields, questions } = await request.json();
  const quiz = await loadQuiz(params.quizId);

  if (!quiz) return json({ error: "Quiz not found" }, { status: 404 });

  if (quiz.curUser !== cookies.get('userid')) return json({ error: "Access denied" }, { status: 401 });

  if (infos.title === "") return json({ error: "Give a title" }, { status: 422 });

  if (!infos.time || infos.time < 1 || infos.time > 300)
    return json({ error: "Time must be between 1 and 300 minutes" }, { status: 422 });

  infos.time = Math.floor(infos.time);
  
  if (requiredFields.length === 0)
    return json({ error: "Add at least one required field" }, { status: 422 });

  if (questions.length === 0)
    return json({ error: "Add at least one question" }, { status: 422 });

  if (requiredFields[0] === "") return json({ error: "Required fields must have valid names" }, { status: 422 });

  // Save quiz as json to storage
  const res = await saveQuiz(params.quizId, { infos, requiredFields, questions }, quiz);

  if (!res) return json({ error: "Couldn't save!" }, { status: 500 });
  return json({ success: "Saved" }, { status: 200});
}