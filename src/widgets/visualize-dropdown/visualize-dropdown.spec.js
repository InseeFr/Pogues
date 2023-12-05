import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import VisualizeDropdown from './components/visualize-dropdown';

describe('Visualize Dropdown Component: ', () => {
  test('Should return the right HTML', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: false,
      componentId: 'component-id',
    };
    const tree = renderer.create(<VisualizeDropdown {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('Should display the dropdown on top', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: false,
      top: true,
      componentId: 'component-id',
    };
    const tree = renderer.create(<VisualizeDropdown {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('Should disable the button', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    const tree = renderer.create(<VisualizeDropdown {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('Should toggle the dropdown', () => {
    const props = {
      visualizeActiveQuestionnaire() {},
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    const wrapper = shallow(<VisualizeDropdown {...props} />);
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
      visualizeActiveQuestionnaire: jest.fn(),
      disabled: true,
      top: false,
      componentId: 'component-id',
    };
    const wrapper = shallow(<VisualizeDropdown {...props} />);
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
