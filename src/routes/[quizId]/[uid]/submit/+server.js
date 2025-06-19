import { evaluateSubmission } from '$lib/server/api.js';
import { error, json, redirect } from '@sveltejs/kit';

export async function POST({ request, params, cookies }) {
  const { ans } = await request.json();
  if (!ans) error(400, "Invalid submission");

  const res = await evaluateSubmission(params.quizId, cookies.get('userid'), ans);

  if (res.error) error(400, res.error);
  
  return json({ success: "Accepted" });
}