import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

configure({ adapter: new Adapter() });
