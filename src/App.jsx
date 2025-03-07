import React from 'react';
import { useState } from 'react';
import {sum, comp, mult, input} from './utils/polynomial';

import './App.css'
import Fraction from 'fraction.js'

let opr

function App() {
  const [data, setData] = useState({
    row: 2,
    col: 4
  });
  const [steps, setSteps] = useState([])
  const [matrix, setMatrix] = useState(
    [[0,'x1','x2','x3','s1','s2','s3','res'],
    ['z','-800','-2000',-1400,'0','0','0','0'],
    ['s1',3,13,9,1,0,0,100],
    ['s2',7,30,32,0,1,0,500],
    ['s3',20,250,170,0,0,1,3000]])
  const [operations, setOperations] = useState([])

  const handleChange = (rowIndex, colIndex, event) => {
    const newValue = event.target.value
    const updatedMatrix = matrix.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        return row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell));
      }
      return row;
    });
    setMatrix(updatedMatrix);
  };

  const handleInput = (event) => {
    const {name, value} = event.target
    setData(
      {...data, [name]: +value }
    )
  }

  const createMatrix = () => {
    //console.log(data.col + " " +  data.row)
    const copy = new Array(data.row+2).fill([]).map(() => new Array(data.col+1).fill(0))
    copy[0] = [...copy[0]]
    copy[0][0] = "f.o."
    setMatrix(copy)
  }

  // useEffect(( ) => {
  //   console.log(operations)}
  // ,operations)

  const calcular = () => {
    
    let flag = true
    setSteps([...steps, matrix])
    steps.push(matrix)
    //console.log(steps);
    
    while (flag){
      let {a,b} = hallarPivote()

      if(a > 0 && b > 0){
    
        opr = []
        normalizar(a,b)
        
        opr = []
        reducirACeroFilas(a,b)
        //setOperations([...operations,[opr]])
      }else{
        flag = false;
      }
    }
  }

  const hallarPivote = () => {
    let copyM = [...steps[steps.length-1]]
    
    //b es la columna

    let x = {a: 0, b: 0}
    let minor = 0
    
    //console.log(copyM)
    let copyRow = [...copyM[1]]
    
    //console.log(copyRow);
    copyRow.map((val,i) => {
      if(i > 0){
        //console.log(val);
        if((""+val).search("M") >= 0 || (''+minor).search('M') >= 0){
          if(comp(input(''+val), input(''+minor)) < 0 ){
            minor = sum(input(''+val),['',''])
            x.b = i
          }
        }else{
          if(new Fraction(''+val).compare(minor) == -1){
            minor = new Fraction(''+val)
            x.b = i
          }
        }
      }
    })


    minor = 99999
    for(let j=2;j<matrix.length && x.b>0;j++){
      let aux = new Fraction(copyM[j][x.b])
      //console.log(aux)
      
      if(+aux != 0){
        let elem = new Fraction(copyM[j][copyM[0].length-1])
        let auxDiv
        auxDiv = elem.div(aux)
        console.log(auxDiv);
        
        
        if( auxDiv.compare(minor) < 0 && auxDiv.compare(0) > 0){
          minor = auxDiv
          x.a = +j
        }
      }
    }
    // console.log(x.a, x.b);


    if(minor <= 0){
      x = {a: 100, b: 100}
    }
    return x
  }


  const normalizar = (f,c) => {

    let copyM = [...steps[steps.length-1]]
    let value = copyM[f][c]
    // console.log(value);
  
    opr = (`F:${f} * (${new Fraction(1).div(value).toFraction()})`)
    copyM[+f] = copyM[+f].map((v,vi) => {
      let res = v
      if(vi != 0){
        res = new Fraction(v).div(value).toFraction()
      }
      return res
    })
    
    steps.push(copyM)
    setSteps(steps => ([...steps,[...copyM]]))

    operations.push([opr])
    //setOperations([...operations,[opr]])
  }


  const reducirACeroFilas = (f,c) => {

    let copyM = [...steps[steps.length-1]]

    let aux
    for(let i=1;i<copyM.length;i++){
      if((''+copyM[i][c]).search('M') >= 0){
        aux = mult(input(copyM[i][c]),input('-1'))
      }else{
        aux = new Fraction(copyM[i][c]).mul(-1)
      }
      // console.log(aux);
      
      if(+f != 0 && +f != i && +c != 0){
        opr = [...opr,`F:${f} * (${(''+aux).search('M') < 0? aux.toFraction() : sum(input(''+aux),input('0'))}) + F:${i}`]
        copyM[i] = copyM[i].map((val, ci) => {
          let res
          // console.log(val);
          if(+ci != 0){
            if((''+aux).search('M') >= 0){
              
              res = sum(input(mult(input(''+copyM[f][ci]),input(''+aux))),input(''+val))

            }else{
              res =  new Fraction(''+copyM[f][ci]).mul(aux).add(val).toFraction()
            }
          }
          else{
            res = val
          }
          return res
        })
      }
    }

    setSteps(steps => ([...steps,copyM]))
    steps.push(copyM)
    
    operations.push(opr)
  }

  const clear = () => {
    setSteps([])
    setOperations([])
  }
  
  return (
    <>
      <h1>Matrix</h1>
      <input onChange={(e) => handleInput(e)} name="row" type="number" placeholder='Num of Variables Hor' /><br />
      <input onChange={(e) => handleInput(e)}  name="col" type="number" placeholder='Num of Variables Vert' /><br />
      <select name="funcion" id="funcion">
        <option value="Minimizar">Minimizar</option>
        <option value="Maximizar">Maximizar</option>
      </select> <br />
      <button onClick={createMatrix}>Create</button>


      <p>Fila en amarillo: Valores de la variable Z</p>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <table style={{margin: '1em'}}>
          <tbody>
            {matrix.map((filas,f) => 
              <tr key={`x${f}`}>
                {filas.map((x,c) => {
                  if(f === 0 || c === 0 ){
                    return (
                      <th key={`x${f}y${c}`} >
                          <input disabled={f == 0 && c == 0? true: false} onChange={(e) => handleChange(f,c,e)} value={x}/>
                        </th>
                      )
                    }else{
                      return (
                        <td style={f == 1? {backgroundColor: 'yellow'}: {}} key={`xl${f}yl${c}`} >
                          <input onChange={(e) => handleChange(f,c,e)} value={x}/>
                        </td>
                      )
                    }
                  }
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={calcular}>Calcular</button>

      <div style={{display: 'flex', flexWrap: 'wrap'}}> 
        {steps.map((mat,mi) => {
          return (
            <div key={`mat${mi}`}>
              <table>
              <thead>
                <tr>
                  <th>
                    {mi}
                  </th>
                </tr>
              </thead>
              <tbody key={`k${mi}`} style={{backgroundColor: 'aquamarine', margin: '0.2em'}} >
                {mat.map((xRow,xi) => {
                  return(
                    <tr key={`km${xi}`}>
                      {xRow.map((y,yi) => {
                        return (
                          <td key={`xn${yi}`} style={xi == 1? {backgroundColor: 'yellow'}: {}}><input readOnly value={y}/></td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          )})}
        </div>
        <div>
          {operations.map((x, index) => {
            return (
              <div key={`xop${index}`}>
                <p>Matriz: {index}</p>
                {x.map((y,yxi) => {
                  return (
                    <div key={`j${yxi}`}>{y}</div>
                  )
                })}</div>
            )
          })}
        </div>
      <button onClick={clear} type="button">Clear</button>
    </>
  )
}

export default App
