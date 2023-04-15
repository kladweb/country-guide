import React from 'react';

import renderer from 'react-test-renderer';

import { CountryInfo } from "./CountryInfo";

test('работа CountryInfo', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <CountryInfo
      code={100}
      name={'Country'}
      population={1000}
      area={5000}
    />
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

});