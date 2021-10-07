//simulación de memoria
let memory = new Uint32Array(4096) //Matriz con tipo de valores enteros de 32 bits
//recorre la memoria y asigna los valores correspondientes (0, 1, 2, ...4095) a cada posición de la memoria
for(let i=0; i <= memory.length; i++) {
  memory[i] = i
}

var cache: any[] = []

//objeto Industrial Protocol
const industialProptocol = {
  //function read que realiza la lectura de la memoria
  read(start: number, length: number, retorno: Function) {
    let response = []
    for(let i = start; i <= length; i++) {
      response.push(memory[i])
    }
    retorno(start, length, response, true)
  }
}

/**
 * Cosntrucción de la solución
 * Se realiza una funcionalidad simple que simula el caching. Esto quiere decir que la tupla ingresada en el la función 
 */
const mySolution = (input: [number, number, Function][]) => {
  input.forEach((element: any) => {
    let value = getCache(element[0], element[1])
    if(Object.keys(value).length == 0) {
      console.log("--- NO CACHE ---")
      industialProptocol.read(element[0], element[1], element[2])
    } else {
      console.log("--- CACHE ---")
      return element[2](0, 0, value[0].result, false)
    }
  })
  // console.log(val)
}

const callback = (start: number, length: number, result: any, register: boolean) => {
  if(register) {
    caching(start, length, result)
  }
  console.log(result)
}

const caching = (start: number, length: number, result: any) => {
  cache.push({start, length, result})
}

const getCache = (start: number, length: number): any => {
  return cache.filter((x: any) => (x.start == start && x.length == length) ? x : '')
}

//Implementación de la solución
//Declara un array de tupla
mySolution([
  [3, 5, callback ],
  [5, 7, callback ],
  [5, 7, callback ],
  [700, 800, callback ],
  [550, 1200, callback ]
])
