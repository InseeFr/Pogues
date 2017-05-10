jest.dontMock('./user-connection');

import React from 'react';
import { shallow } from 'enzyme';

import UserConnection from './user-connection';

describe('<UserConnection />', () => {
  const userWithPicture = {
    name: 'John',
    picture: '/fake/path/picture.gif',
  };
  const userWithoutPicture = {
    name: 'John',
  };
  const wrapperNotLogged = shallow(<UserConnection />);
  const wrapperLogged = shallow(<UserConnection user={userWithPicture} />);
  const wrapperLoggedWithoutPicture = shallow(<UserConnection user={userWithoutPicture} />);

  test('should render without throwing an error', () => {
    expect(wrapperNotLogged.is('#user-connection')).toBe(true);
  });

  // @TODO: We need wireframes of the login form
  test('should render a login form if the user is not defined', () => {
    expect(wrapperNotLogged.find('.user-login').length).toBe(1);
  });

  // @TODO: We don't know yet the structure of the user object
  test('should render the user name when is defined', () => {
    expect(wrapperLogged.find('.user-name').text()).toBe(userWithPicture.name);
  });

  test('should render the user picture when is defined', () => {
    expect(wrapperLogged.find(`.user-picture img[src="${userWithPicture.picture}"]`).length).toBe(1);
  });

  test("should render a default user's picture if user exist but the picture is not defined", () => {
    expect(wrapperLoggedWithoutPicture.find('.user-picture img').is('.default-picture')).toBe(true);
  });
});
