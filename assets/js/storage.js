const KEY = 'soc_voluntarios_v1';
export const getVoluntarios = () => JSON.parse(localStorage.getItem(KEY) || '[]');
export function addVoluntario(v){ const all=getVoluntarios(); all.push(v); localStorage.setItem(KEY, JSON.stringify(all)); }
