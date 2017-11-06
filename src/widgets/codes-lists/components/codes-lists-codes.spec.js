import React from 'react';
import { shallow } from 'enzyme';

import CodesListCodes from './codes-lists-codes';

import { fakeFieldArrayMeta, fakeFieldArrayFields, noop, fakeEnterEvent } from 'utils/test/test-utils';

describe('<CodesListCodes />', () => {
  let customProps;

  beforeEach(() => {
    customProps = {
      formName: 'FAKE_FORM_NAME',
      inputCodePath: 'FAKE_INPUT_CODE_PATH',
      change: noop,
      fields: fakeFieldArrayFields,
      meta: fakeFieldArrayMeta,
      validate: noop,
      path: 'fake.path',
    };
  });

  test.skip('Should render an entry code form with the expected fields', () => {
    const wrapper = shallow(<CodesListCodes {...customProps} />);

    expect(wrapper.find(`Field[name="${customProps.path}.code.value"]`)).toHaveLength(1);
    expect(wrapper.find(`Field[name="${customProps.path}.code.label"]`)).toHaveLength(1);
    expect(wrapper.find(`Field[name="${customProps.path}.code.parent"][type="hidden"]`)).toHaveLength(1);
  });

  test.skip(
    'Should insert in the list of codes a new code with the form values when enter is tapped in the code field',
    () => {
      const spyPushFromCodeEnter = jest.fn();

      // Enter in the code field
      customProps.fields.push = spyPushFromCodeEnter;
      const wrapper = shallow(<CodesListCodes {...customProps} />);

      wrapper.find(wrapper.find(`input[name="${customProps.path}.code.value"]`)).simulate('keyDown', fakeEnterEvent);
      expect(spyPushFromCodeEnter).toHaveBeenCalled();
    }
  );
});
