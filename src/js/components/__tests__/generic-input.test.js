/*
GenericInput test suite
*/
jest.dontMock('../generic-input.js');
jest.dontMock('../../stores/dictionary-store.js');
// FIXME Shouldn't we mock that instead ? See https://facebook.github.io/flux/docs/testing-flux-applications.html
jest.dontMock('../../dispatchers/pogues-dispatcher.js');
jest.dontMock('flux');
jest.dontMock('object-assign');

describe('GenericInput i18n management', function() {
  it('Should show the hint corresponding to the default language', function() {
    var React = require('react/addons'),
      GenericInput = require('../generic-input.js'),
      TestUtils = React.addons.TestUtils,
      DictStore = require('../../stores/dictionary-store.js');

    var genericInput = TestUtils.renderIntoDocument(
      <GenericInput />
    );

    var giComponent = TestUtils.findRenderedDOMComponentWithTag(genericInput, 'input');

    expect(giComponent.getDOMNode().getAttribute('placeholder')).toBe(DictStore.getDictionary().enterTitle);
  });
});
