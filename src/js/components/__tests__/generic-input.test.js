/*
GenericInput test suite
*/
jest.dontMock('../generic-input.js');

describe('GenericInput i18n management', function() {
  it('Should show the hint corresponding to the user language', function() {
    var React = require('react/addons'),
      GenericInput = require('../generic-input.js'),
      TestUtils = React.addons.TestUtils;

    var genericInput = TestUtils.renderIntoDocument(
      <GenericInput language="fr" />
    );

    var giFR = TestUtils.findRenderedDOMComponentWithTag(genericInput, 'input');

    // FIXME hard-coded french label !!!
    expect(giFR.getDOMNode().getAttribute('placeholder')).toBe('Entrez un intitulé de question');
  });
});
