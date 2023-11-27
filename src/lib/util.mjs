export function assign(obj, props) {
	for (let i in props) obj[i] = props[i];  // eslint-disable-line guard-for-in
}

export function toLower(str) {
	return String(str).toLowerCase();
}

export function createAttributeFilter(ns, name) {
	return o => o.ns===ns && toLower(o.name)===toLower(name);
}

export function splice(arr, item, add, byValueOnly) {
	let i = arr ? findWhere(arr, item, true, byValueOnly) : -1;
	if (~i) add ? arr.splice(i, 0, add) : arr.splice(i, 1);
	return i;
}

export function findWhere(arr, fn, returnIndex, byValueOnly) {
	let i = arr.length;
	while (i--) if (typeof fn==='function' && !byValueOnly ? fn(arr[i]) : arr[i]===fn) break;
	return returnIndex ? i : arr[i];
}

let resolved = typeof Promise!=='undefined' && Promise.resolve();
export const setImmediate = resolved ? (f => { resolved.then(f); }) : setTimeout;
