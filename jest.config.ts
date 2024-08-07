// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
    '^next/router$': '<rootDir>/__mocks__/next/router.ts',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
