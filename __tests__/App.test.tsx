/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import {baseApi} from '../src/Redux/baseApis';
import {store, unsubscribeStoreListeners} from '../src/Redux/store';

jest.useFakeTimers();

afterEach(() => {
  store.dispatch(baseApi.util.resetApiState());
  jest.runOnlyPendingTimers();
  jest.clearAllTimers();
});

afterAll(() => {
  (globalThis as any).window.removeEventListener =
    (globalThis as any).window.removeEventListener || jest.fn();
  unsubscribeStoreListeners();
  jest.useRealTimers();
});

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(() => {
    renderer?.unmount();
  });
});
