import { createDotsString } from '../src';

describe('createDotsString', () => {
  it('empty', () => {
    expect(createDotsString(0)).toEqual('');
  });

  it('normal', () => {
    expect(createDotsString(3)).toEqual('...');
  });
});
