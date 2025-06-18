import { redirect } from '@sveltejs/kit';

export function load({ url }) {
  return redirect(303, url.pathname + "/0");
}