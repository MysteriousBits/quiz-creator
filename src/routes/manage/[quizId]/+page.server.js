import { loadQuiz, quizExists, saveQuiz } from '$lib/server/api.js';
import { redirect, json, fail } from '@sveltejs/kit';

export function load({ params }) {
  return {
    quizId: params.quizId === "0" ? "" : params.quizId
  };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const id = data.get('id');
    const pass = data.get('pass');

    if (await quizExists(id)) {
      const data = await loadQuiz(id);

      if (data.pass === pass) {
        let userId = cookies.get('userid');

        if (!userId) {
          userId = crypto.randomUUID();
          cookies.set('userid', userId, { path: '/' });
        }

        data.curUser = userId;
        await saveQuiz(id, data);

        return redirect(303, `/${id}/manage`);
      }
      else return fail(422, { error: "Password not correct" });
    }
    else {
      return fail(422, { error: "Quiz not found" });
    }
  }
};