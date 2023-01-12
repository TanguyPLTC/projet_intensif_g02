/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const res = await fetch("https://intensif02.ensicaen.fr/api/building");
  const item = await res.json();

  return { item };
}