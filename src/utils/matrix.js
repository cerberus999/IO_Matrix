export function test1(){
    let res = []
    let supr = []
    supr[0] = "1/6"
    supr[1] = "5"
    res = [...res, supr]
    supr = []
    supr[0] = "9"
    supr[1] = "200"
    res = [...res, supr]
    
    return res  
}