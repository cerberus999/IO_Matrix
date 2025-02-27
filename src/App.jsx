import { useState } from 'react'
import './App.css'
import Fraction from 'fraction.js'

function App() {
  const [data, setData] = useState({
    row: 2,
    col: 4
  });
  const [steps, setSteps] = useState([])
  const [matrix, setMatrix] = useState([[0,'x1','x2','x3','res'],['z',-5,-3,-2,0],['x1',3,"3/2",1,30],['x2',2,3,2,40],['x3',4,3,2,60]])
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

  const calcular = () => {
    
    let flag = true
    setSteps([...steps, matrix])
    steps.push(matrix)
    //console.log(steps);
    
    while (flag){
      let {a,b} = hallarPivote()

      if(a > 0 && b > 0){
        normalizar(a,b)
        reducirACeroFilas(a,b)
      }else{
        flag = false;
      }
    }
  }

  const hallarPivote = () => {


    let copyM = [...steps[steps.length-1]]
    
    let x = {a: 0, b: 0}
    let minor = 0
    
    //console.log(copyM)
    let copyRow = [...copyM[1]]
    
    //console.log(copyRow);
    copyRow.map((val,i) => {
      
      if(i > 0 && new Fraction(''+val).compare(minor) == -1){ 
        //console.log(val);
       if(new Fraction(''+val).compare(0) == -1){
        minor = new Fraction(''+val)
        x.b = i
        //console.log("indice " + x.b)
       }
      }
    })


    minor = 99999
    for(let j=2;j<matrix.length && x.b>0;j++){
      let aux = new Fraction(copyM[j][x.b])
      console.log(aux)
      
      if(+aux != 0){
        // console.log(x.b);
        let elem = new Fraction(copyM[j][copyM[x.b].length-1])
        let auxDiv
        auxDiv = elem.div(aux)
        
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
  
    copyM[+f] = copyM[+f].map((v,vi) => {
      let res = v
      if(vi != 0){
        res = new Fraction(v).div(value).toFraction()
      }
      return res
    })
    
    steps.push(copyM)
    setSteps(steps => ([...steps,[...copyM]]))
    // console.log(steps)
  }


  const reducirACeroFilas = (f,c) => {

    let copyM = [...steps[steps.length-1]]

    let aux
    for(let i=1;i<copyM.length;i++){
      aux = new Fraction(copyM[i][c]).mul(-1)
      // console.log(aux);
      
      copyM[i] = copyM[i].map((val, ci) => {
        // console.log(val);
        if(+f != 0 && +f != i && +c != 0 && +ci != 0){

          return new Fraction(copyM[f][ci]).mul(aux).add(val).toFraction()
        }
        else{
          return val
        }
      })
    }

    setSteps(steps => ([...steps,copyM]))
    steps.push(copyM)
    
  }

  const clear = () => {
    setSteps([])
  }

  return (
    <>
      <div style={{position: 'absolute', left: '80px', rotate: '-90deg'}}>
        <h2 style={{color: '#242424'}}>❤ Jaly Daniela ❤</h2>
      </div>
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
                        <td style={f == 1? {backgroundColor: 'yellow'}: {}} key={`x${f}y${c}`} >
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
            <table>
            <thead>
              <tr>
                <th>
                  {mi}
                </th>
              </tr>
            </thead>
            <tbody key={mi} style={{backgroundColor: 'aquamarine', margin: '0.2em'}} >
              {mat.map((xRow,xi) => {
                return(
                  <tr key={xi}>
                    {xRow.map((y,yi) => {
                      return (
                        <td style={xi == 1? {backgroundColor: 'yellow'}: {}} key={yi}><input readOnly value={y}/></td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
            </table>
          )})}
          <button onClick={clear} type="button">Clear</button>
      </div>
    </>
  )
}

export default App
