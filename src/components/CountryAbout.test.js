import React from 'react';

import renderer from 'react-test-renderer';

import { CountryAbout } from "./CountryAbout";

test('работа CountryAbout', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <CountryAbout/>
  );

  let componentTree = component.toJSON();
  expect(componentTree).toMatchSnapshot();

});