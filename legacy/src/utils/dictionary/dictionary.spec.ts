import { expect, test } from 'vitest';

import { createDictionary, getLang } from './dictionary';

test(`should return the french version when the navigator.language is FR`, () => {
  expect(createDictionary('fr').welcome).toBe('Bienvenue dans POGUES');
});

test(`should return the english version when the navigator.language is EN`, () => {
  expect(createDictionary('en').welcome).toBe('Welcome to POGUES');
});

test.each([
  ['fr', 'fr'],
  ['fr-FR', 'fr'],
  ['de-DE', 'en'],
])('getLang(%s) -> %s', (locale, expected) => {
  expect(getLang(locale)).toBe(expected);
});
