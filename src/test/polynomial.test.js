import {describe, expect, test} from 'vitest';
import {input, sum, mult} from '../utils/polynomial';


//Argumentos
describe('Pruebas de argumentos', () => {
    test("test input", () => {
        expect(input("1/2+4/6M")).toStrictEqual(["1/2","4/6"])
    })
})

describe('Pruebas de argumentos', () => {
    test("test input", () => {
        expect(input("1/2-4/6M")).toStrictEqual(["1/2", "-4/6"])
    })
})

describe('Pruebas de argumentos', () => {
    test("test input fraccion", () => {
        expect(input("1/2")).toStrictEqual(["1/2", ""])
    })
})

describe('Pruebas de argumentos', () => {
    test("test input fraccion alg", () => {
        expect(input("4/6M")).toStrictEqual(["","4/6"])
    })
})
describe('Pruebas de argumentos', () => {
    test("test input fraccion alg", () => {
        expect(input("M")).toStrictEqual(["","1"])
    })
})

//Suma

describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg", () => {
        expect(sum(["1/2", "5/3"],["1/3","5/8"])).toStrictEqual("5/6+55/24M")
    })
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg", () => {
        expect(sum(["1/2", "-5/3"],["1/3","5/8"])).toStrictEqual("5/6-25/24M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg", () => {
        expect(sum(["1/2", "5/3"],["1/3","-5/8"])).toStrictEqual("5/6+25/24M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg only nums", () => {
        expect(sum(["1/2", ""],["1/3",""])).toStrictEqual("5/6")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg only algebraic", () => {
        expect(sum(["","1/2"],["","1/3"])).toStrictEqual("5/6M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg mixed", () => {
        expect(sum(["4/9","1/2"],["","1/3"])).toStrictEqual("4/9+5/6M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg mixed", () => {
        expect(sum(["4/9",""],["","1/3"])).toStrictEqual("4/9+1/3M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg mixed", () => {
        expect(sum(["4/9","-5"],["-2","-3"])).toStrictEqual("-14/9-8M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg mixed", () => {
        expect(sum(["-4/9","-5"],["2","-3"])).toStrictEqual("14/9-8M")
    })    
})
describe('Pruebas de suma algebraica', () => {
    test("test input fraccion alg mixed", () => {
        expect(sum(["-2","3"],["2","-3"])).toStrictEqual("0")
    })    
})


//Multiplicacionx
describe('Pruebas de multiplicacion algebraica', () => {
    test("test mult", () => {
        expect(mult(["-4/9",""],["2","-3"])).toStrictEqual("-8/9+4/3M")
    })
})
describe('Pruebas de multiplicacion algebraica', () => {
    test("test mult", () => {
        expect(mult(["0",""],["2","-3"])).toStrictEqual("0")
    })
})
describe('Pruebas de multiplicacion algebraica', () => {
    test("test inv", () => {
        expect(mult(["-1",""],["2","-3"])).toStrictEqual("-2+3M")
    })
})
describe('Pruebas de multiplicacion algebraica', () => {
    test("test M", () => {
        expect(mult(["","1"],["2",""])).toStrictEqual("2M")
    })
})
describe('Pruebas de multiplicacion algebraica', () => {
    test("test M", () => {
        expect(mult(["","-1"],["2",""])).toStrictEqual("-2M")
    })
})
describe('Pruebas de multiplicacion algebraica', () => {
    test("test M", () => {
        expect(mult(["0",""],["2","1/3"])).toStrictEqual("0")
    })
})
describe('Pruebas de multiplicacion algebraica', () => {
    test("test M", () => {
        expect(mult(["2","1/5"],["2",""])).toStrictEqual("4+2/5M")
    })
})