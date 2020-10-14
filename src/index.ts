export const HELLO = 'HELLO';

interface HelloResponse {
  readonly value: 'HELLO';
}
export const callHello = (): HelloResponse => ({ value: 'HELLO' });
