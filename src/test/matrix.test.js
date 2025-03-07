import {describe, expect, test} from 'vitest';
import {test1} from '../utils/matrix';

describe('Tests', () => {
    test("Matrix add", () => {
        expect(test1()).toStrictEqual([["1/6","5"],["9","200"]])
    })
})