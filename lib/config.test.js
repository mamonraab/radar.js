import test from 'ava'
import config from './config'

test('Should parse to object', t => t.true(typeof config === 'object'))
