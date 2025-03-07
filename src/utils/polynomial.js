import Fraction from 'fraction.js';

/**
 * 
 * @param {[string]} p1 
 * @param {[string]} p2 
 * @returns res: string
 */
export function sum(p1, p2){
    let res = ""
    let aux
    p1 = p1.map(x => x == ""? "0":x)
    p2 = p2.map(x => x == ""? "0":x)
    
    aux = new Fraction(p1[0]).add(new Fraction(p2[0])).toFraction()
    aux != 0? res += aux : ''
    
    aux = new Fraction(p1[1]).add(new Fraction(p2[1])).toFraction()
    aux != 0? res += (aux.search('-') >= 0? '': 
     res == ''? '': 
      '+') + aux + 'M': 
       ''
       
    res = res == ''? "0": res
    return res
}

/**
 * 
 * @param {string}: string 
 * @returns {[string]} res
 */
export function input(value){
    let res
    if(''+value.search('M') < 0){
        res = [value, ""]
    }else{       
        let regex = /\b[+-]/g
        let regexMinus = /\b[-]/g
        value = ""+value
        let prt = value.split(regex)
        if(value.search(regex) >= 0){
            if(value.search(regexMinus) > 0 ){
                prt[1] = "-"+prt[1]
            }
            res = [prt[0], prt[1].slice(0,prt[1].length-1)]
        }else if(value.search("M") > 0){
            res = ["", value.slice(0,value.length-1)]
        }else if(value.search("M") == 0){
            res = ["","1"]
        }
    }
    return res
}

/**
 * 
 * @param {[string]} p1 
 * @param {[string]} p2 
 * @returns {string} res
 * 
 * Only first term recieves 'M'
 */
export function mult(p1, p2) {
    let res = ""
    let aux
    p1 = p1.map(x => x == ""? "0":x)
    p2 = p2.map(x => x == ""? "0":x)

    if(p1[0] != 0){
        aux = new Fraction(p1[0]).mul(new Fraction(p2[0])).toFraction()
        aux != 0? res += aux : ''
        
        aux = new Fraction(p1[0]).mul(new Fraction(p2[1])).toFraction()
        aux != 0? res += (aux.search('-') >= 0? '': 
        res == ''? '': 
        '+') + aux + 'M': 
        ''
    }
    if(p1[1] != 0){
        aux = new Fraction(p1[1]).mul(new Fraction(p2[0])).toFraction()
        aux != 0? res += (aux.search('-') >= 0? '': 
        res == ''? '': 
        '+') + aux + 'M': 
        ''
    } 
    res = res == ''? "0": res
    return res 
}

export function comp(p1, p2) {
    p1 = p1.map(x => x == ""? "0":x)
    p2 = p2.map(x => x == ""? "0":x)
    return new Fraction(p1[0]).compare(new Fraction(p2[0]))
}
