import { describe, expect, test } from 'vitest';
import { SHORT_NAME, SUBTITLE, TITLE, TITLE_WORD } from '../src/title';

describe('the title', () => {
  test('the full title is the word plus the subtitle, in one place', () => {
    expect(TITLE).toBe('Sorcery: Realm of the Undervault');
    expect(TITLE.toLowerCase()).toBe(`${TITLE_WORD.toLowerCase()}: ${SUBTITLE.toLowerCase()}`);
    expect(SHORT_NAME).toBe('Undervault');
  });
});
