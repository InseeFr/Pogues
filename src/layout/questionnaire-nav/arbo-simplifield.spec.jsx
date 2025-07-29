import { shallow } from 'enzyme';
import { describe, expect, test, vi } from 'vitest';

import { COMPONENT_TYPE } from '../../constants/pogues-constants';
import ArboSimplified from './arbo-simplifield';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

const mockEvent = {
  preventDefault: () => {},
};

describe('<ArboSimplified />', () => {
  const spysetSelectedComponentId = vi.fn();
  const props = {
    questionnaire: { id: '0' },
    components: {
      0: {
        name: '0',
        type: QUESTIONNAIRE,
        id: '0',
        parent: '',
        children: ['1'],
      },
      1: {
        name: '1',
        type: SEQUENCE,
        id: '1',
        parent: '0',
        children: ['2', '4', '5'],
      },
      2: {
        name: '2',
        type: SUBSEQUENCE,
        id: '2',
        parent: '1',
        children: ['3'],
      },
      3: { name: '3', type: QUESTION, id: '3', parent: '2', children: [] },
      4: { name: '4', type: QUESTION, id: '4', parent: '1', children: [] },
      5: { name: '5', type: SUBSEQUENCE, id: '5', parent: '1', children: [] },
    },
    setSelectedComponentId: spysetSelectedComponentId,
  };

  test('should render without throwing an error', () => {
    const wrapper = shallow(<ArboSimplified {...props} />);
    expect(wrapper.is('.arbo-simplifield')).toBe(true);
  });

  test('should render only one level if no node is selected', () => {
    const wrapper = shallow(<ArboSimplified {...props} />);
    expect(wrapper.find('.arbo-simplifield').length).toBe(1);
  });

  test('should render two level if a node is selected', () => {
    const wrapper = shallow(<ArboSimplified {...props} />);
    wrapper.find('button').at(0).simulate('click', mockEvent);
    expect(wrapper.find('.arbo-simplifield').length).toBe(2);
  });

  test('for a question, should add the questions class', () => {
    const wrapper = shallow(<ArboSimplified {...props} />);
    wrapper.find('button').at(0).simulate('click', mockEvent);
    expect(wrapper.find('.questions').length).toBe(1);
  });

  test('should call setSelectedComponentId when a node is selected', () => {
    spysetSelectedComponentId.mockClear();
    const wrapper = shallow(<ArboSimplified {...props} />);
    wrapper.find('button').at(1).simulate('click', mockEvent);
    expect(spysetSelectedComponentId).toBeCalledWith('1');
  });

  test('should have an icon for all element with children', () => {
    const wrapper = shallow(<ArboSimplified {...props} />);
    wrapper.find('button').at(0).simulate('click', mockEvent);
    wrapper.find('button').at(1).simulate('click', mockEvent);
    expect(wrapper.find('.glyphicon').length).toBe(2);
  });

  test('should update the icon when we click on the link', () => {
    const wrapper = shallow(<ArboSimplified {...props} />);
    expect(wrapper.find('button').at(0).hasClass('glyphicon-menu-right')).toBe(
      true,
    );
    wrapper.find('button').at(0).simulate('click', mockEvent);
    expect(wrapper.find('button').at(0).hasClass('glyphicon-menu-down')).toBe(
      true,
    );
  });
});
