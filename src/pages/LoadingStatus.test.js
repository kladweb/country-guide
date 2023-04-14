import React from 'react';

import renderer from 'react-test-renderer';

import { LoadingStatus } from "./LoadingStatus.js";

test('работа LoadingStatus', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <LoadingStatus/>
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

});