// jest.setup.ts
import '@testing-library/jest-dom';

global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) => {
  return Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: input.toString(),
    clone: () => Promise.resolve(this as unknown as Response),
    text: () => Promise.resolve(''),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
  } as unknown as Response);
}) as jest.Mock;
