/* eslint-env mocha */
import Logger from './logger';

describe('Instantiate Logger', () => {
  test('must have a module name and the default namespace', () => {
    const customModule = 'my-module';

    const testLogger = new Logger('my-module');

    expect(testLogger.moduleName).toEqual(customModule);
    expect(testLogger.namespace).toEqual('default');
  });

  test('must have a custom namespace', () => {
    const customNameSpace = 'components';

    const testLogger = new Logger('second-module', customNameSpace);

    expect(testLogger.namespace).toEqual(customNameSpace);
  });

  test('should compute the right prefix', () => {
    const customModule = 'my-module';
    const customNameSpace = 'components';

    const testLogger = new Logger(customModule, customNameSpace);

    expect(testLogger.getPrefix()).toEqual('[components][my-module]');
  });
});
