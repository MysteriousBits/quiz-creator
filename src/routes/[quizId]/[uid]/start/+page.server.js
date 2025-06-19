import { json, redirect, fail, error } from '@sveltejs/kit';
import { getSubmission, loadQuiz, startQuiz } from '$lib/server/api.js';

export async function load({ url, params, cookies }) {
  const { uid, infos, requiredFields } = await loadQuiz(params.quizId);
  
  if (!infos) error(404, "Quiz not found");
  if (uid !== params.uid) error(404, "Not found");
  
  const userId = cookies.get('userid');
  if (userId) {
    const { time } = await getSubmission(params.quizId, userId);
    if (time)
      return redirect(302, url.pathname.slice(0, -6));
  }

  return { ...infos, requiredFields, quizId: params.quizId };
}

export const actions = {
  default: async ({ request, url, cookies, params }) => {
    const res = await request.formData();

    if (!res.get('0') || res.get('0') === '')
      return fail(422, { error: "Required fields must not be empty" });

    let userId = cookies.get('userid');
    if (!userId) {
      userId = crypto.randomUUID();
      cookies.set('userid', userId, { path: '/' });
    }
    
    let requiredFields = [];
    res.values().forEach(val => {
      requiredFields.push(val);
    });

    await startQuiz(params.quizId, userId, requiredFields);
    return redirect(303, url.pathname.slice(0, -6));
  }
};