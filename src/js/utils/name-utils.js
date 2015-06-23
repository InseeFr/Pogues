/*
Contains utilities functions for name manipulation.
*/

// Short name rule
export const rName = /^[a-z0-9_]*$/i;
const rNameNeg = /[^a-z0-9_]/gi;

/* 
This function create a name from a label.
It can be use for names and labels in for questionnaires
as well as sequences and questions.
 */
export function nameFromLabel(label) {
	return label.replace(rNameNeg, '').toUpperCase().slice(0, 10);
}