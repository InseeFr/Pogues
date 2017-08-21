jest.dontMock('./user-connection');

import React from 'react';
import { shallow } from 'enzyme';

import UserConnection from './components/user-connection';
import { getLocale } from 'utils/test/test-utils';

const locale = getLocale();

describe('<UserConnection />', () => {
  const userWithPicture = {
    name: 'John',
    picture: '/fake/path/picture.gif',
  };
  const userWithoutPicture = {
    name: 'John',
  };
  const propsNoUser = {
    locale: locale,
  };
  const propsUserWithPicture = {
    user: userWithPicture,
    locale: locale,
  };
  const propsUserWithoutPicture = {
    user: userWithoutPicture,
    locale: locale,
  };
  const wrapperNotLogged = shallow(<UserConnection {...propsNoUser} />);
  const wrapperLogged = shallow(<UserConnection {...propsUserWithPicture} />);
  const wrapperLoggedWithoutPicture = shallow(<UserConnection {...propsUserWithoutPicture} />);

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
