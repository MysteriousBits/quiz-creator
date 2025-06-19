import { err, success } from '$lib/stores/store.svelte.js';
import { redirect, fail, error } from '@sveltejs/kit';
import { clearId, getAvaiableId } from '$lib/server/store.js';
import { createQuiz } from '$lib/server/api.js';

export async function load({ cookies }) {
    let userId = cookies.get('userid');

    if (!userId) {
      userId = crypto.randomUUID();
      cookies.set('userid', userId, { path: '/' });
    }

    // Temporarily store the id
    const quizId = await getAvaiableId(userId);
    
    return {quizId : quizId};
}

export const actions = {
  default: async ({ request, cookies, params }) => {
    const data = await request.formData();
    
    const res = await create(data.get('pass'), cookies.get('userid'));

    if (!res.success) {
      return fail(422, res);
    }

    return redirect(303, `/${data.get('id')}/manage`);
  }
};

async function getId() {
  const id = await nxtId();
  return id;
}

async function create(pass, userId) {
  if (pass.length < 4) return { error: "Passkey too small"};
  if (!userId) error(417, "No user detected");

  let id = clearId(userId);
  if (!id) error(503, "Can't create quiz. Rery.");

  await createQuiz(userId, id, generateUid(), pass);

  
  return {success: true};
}

function generateUid() {
  return Math.random().toString(36).substring(2, 8);
}