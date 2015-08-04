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

export function stripLeadingUnderscore(stringToStrip) {
	return /_(\w+)/.exec(stringToStrip).pop();
}

/*
Capitalize a string.
See here for a choice of algos : http://bit.ly/1LtxsIp
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}
