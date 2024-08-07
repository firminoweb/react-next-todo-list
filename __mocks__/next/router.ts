// src/__mocks__/next/router.ts
import { NextRouter } from 'next/router';

const useRouter = jest.fn();

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
});

module.exports = {
  useRouter,
};
