jest.dontMock('../questionnaire-title.js');

describe('Questionnaire title component test', function() {
  it('should render the title pass through props', function() {
    var React = require('react/addons'),
      // QuestionnaireTitle = require('../questionnaire-title.js'),
      TestUtils = React.addons.TestUtils;

      // FIXME obsolete !
      // TODO
      // var qt = TestUtils.renderIntoDocument(<QuestionnaireTitle title="mon titre"/>)
      //
      // var qtWithCustomTitle = TestUtils.findRenderedDOMComponentWithTag(qt, 'p');
      //
      // expect(React.findDOMNode(qtWithCustomTitle).textContent).toBe('mon titre');
  });
});
