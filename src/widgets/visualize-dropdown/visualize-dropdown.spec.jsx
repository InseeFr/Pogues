import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test, vi } from 'vitest';
import { OidcProvider } from '../../utils/oidc';
import VisualizeDropdown from './components/visualize-dropdown';

describe('Visualize Dropdown Component: ', () => {
  test('Should return the right HTML', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: false,
      componentId: 'component-id',
    };
    const tree = renderer
      .create(
        <OidcProvider>
          <VisualizeDropdown {...props} />
        </OidcProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('Should display the dropdown on top', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: true,
      componentId: 'component-id',
    };
    const tree = renderer
      .create(
        <OidcProvider>
          <VisualizeDropdown {...props} />
        </OidcProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('Should disable the button', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    const tree = renderer
      .create(
        <OidcProvider>
          <VisualizeDropdown {...props} />
        </OidcProvider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('Should toggle the dropdown', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    const wrapper = shallow(
      <OidcProvider>
        <VisualizeDropdown {...props} />
      </OidcProvider>,
    );
    expect(wrapper.find('div').hasClass('open')).toBeFalsy();
    wrapper
      .find('button[id="visualize"]')
      .simulate('click', { preventDefault() {}, stopPropagation() {} });
    expect(wrapper.find('div').hasClass('open')).toBeTruthy();
    wrapper
      .find('button[id="visualize"]')
      .simulate('click', { preventDefault() {}, stopPropagation() {} });
    expect(wrapper.find('div').hasClass('open')).toBeFalsy();
  });

  test('Should call the visualizeActiveQuestionnaire method and hide the dropdown', () => {
    const props = {
      visualizeActiveQuestionnaire: vi.fn(),
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    const wrapper = shallow(
      <OidcProvider>
        <VisualizeDropdown {...props} />
      </OidcProvider>,
    );
    wrapper
      .find('a')
      .first()
      .simulate('click', { preventDefault() {}, stopPropagation() {} });
    expect(props.visualizeActiveQuestionnaire).toHaveBeenCalledWith(
      'html',
      props.componentId,
      props.token,
    );
  });
});
