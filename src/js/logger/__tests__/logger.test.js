/* eslint-env mocha */
import Logger from '../logger';
import { expect } from 'chai';

describe('Instantiate Logger', function() {
  it('must have a module name and the default namespace', function() {
    var customModule = 'my-module';

    var testLogger = new Logger('my-module');

    expect(testLogger.moduleName).to.equal(customModule);
    expect(testLogger.namespace).to.equal('default');
  });

  it('must have a custom namespace', function() {
    var customNameSpace = 'components';

    var testLogger = new Logger('second-module', customNameSpace);

    expect(testLogger.namespace).to.equal(customNameSpace);
  });

  it('should compute the right prefix', function() {
    var customModule = 'my-module';
    var customNameSpace = 'components';

    var testLogger = new Logger(customModule, customNameSpace);

    expect(testLogger.getPrefix()).to.equal('[components][my-module]');
  });
});
