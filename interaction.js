//1. Para completar la tabla de ventas
const fillTable = () => {
    data.sales.forEach(item => {
      const li = document.createElement('li')
      const dateList = document.getElementById('dateList')
      dateList.appendChild(li)
      li.innerText = item.saleDate.toLocaleDateString()
    })
  
    data.sales.forEach(item => {
      const li = document.createElement('li')
      const nameList = document.getElementById('nameList')
      nameList.appendChild(li)
      li.innerText = item.employeeName
    })
  
    data.sales.forEach(item => {
      const li = document.createElement('li')
      const itemList = document.getElementById('itemList')
      itemList.appendChild(li)
      li.innerText = item.itemSold.join(`, `)
    })
  
    data.sales.forEach(item => {
      const li = document.createElement('li')
      const branchList = document.getElementById('branchList')
      branchList.appendChild(li)
      li.innerText = item.branchOffice
    })
  }

//2. Para crear nuevas ventas
// Modelo de nueva venta
function sale(saleDate, employeeName, itemSold, branchOffice) {
    this.saleDate = new Date(saleDate)
    this.employeeName = employeeName
    this.itemSold = itemSold
    this.branchOffice = branchOffice
  }
  
  const createSale = () => {
    let saleDateField = document.getElementById('enterSaleDate')
    let employeeNameField = document.getElementById('selectEmployeeName')
    let itemSoldField = document.getElementById('selectItemSold')
    let branchOfficeField = document.getElementById('selectBranchOffice')
    let newSale = new sale(saleDateField.value, employeeNameField.value, itemSoldField.value, branchOfficeField.value)
    data.sales.push(newSale)
  }

//3. Para armar selects y opciones
//3.a identificar tipos de componentes
//3.a.i extraigo tipos de componentes
const allTypes = data.prices.map(({type}) =>type)
//3.a.ii filtro para que no se repitan
const compTypes =allTypes.filter((e,i)=> allTypes.indexOf(e) === i)

//3.b genero selecs por cada tipo de componente
const createSelects =(list, container) => {
    list.forEach(e=> {
        let select = document.createElement("select")
        select.id=e 
        container.appendChild(select)
    })
    
}

//3.c funcion de crear una opción
const createOption = comp => {
  let option=document.createElement ("option")
  option.innerText=comp.item
  option.value =comp.id
  return option
}

const createOption2=e=> {
    let option=document.createElement("option")
    option.innerText=e
    option.value=e
    return option
}

//3.d una función para poblar los selects
const fillSelects =list => {
    list.forEach(e=> {
        let select = document.getElementById (e.type) 
        if (!select.childElementCount) {
            let placeholder = {item: `Seleccione ${e.type}` , id:""}
            select.appendChild(createOption(placeholder))
        }
        select.appendChild(createOption(e))
    })
}

const fillSelects2=(list, type)=> {
    let select = document.getElementById(type)
    list.forEach (e=>{
        if (!select.childElementCount) {
            let placeholder = {item: `Seleccione opcion` , id:""}
            select.appendChild(createOption(placeholder))
        }
        select.appendChild(createOption2(e))
    })
}

//4. Función que agarra el input y me da un conjunto de datos.
const newInput = e=> {
    let input = {products:[], employee:undefined, year:undefined, month:undefined}
    compTypes.forEach(e => {
        let select = document.getElementById(e)
        let product = data.prices.find(e=>e.id===select.value)
        input.products.push(product.item)
    })
    
    input.employee  = document.getElementById("employees").value
    let auxDate = new Date (document.getElementById("year").value)
    input.year= auxDate.getFullYear()
    input.month=auxDate.getMonth()
    return input
}

//5. Función que imprime al costado el resultado
const printResult =(what,where)=>{
  let container = document.getElementById(where)
  container.innerHTML=""
  let result =document.createElement("p")
  result.innerText=what
  container.appendChild(result)
 }

//6. Funciones para los botones
let btnPrecioVenta = e=> {
  printResult (`El precio de venta de ${newInput(e).products} es ARS ${salePrice(newInput(e).products)}`, "result")
}

let btnVtasArticulo = e => {
  printResult(` El ítem "${newInput(e).products[0]}" fue vendido históricamente ${timesSold(newInput(e).products[0])} veces`, "result")
}

let btnVendMes = e=> {
  let aux = employeeOfTheMonth(newInput(e).year,newInput(e).month+1)
  if (aux.length < 2) { 
    printResult(`La mejor vendedora del mes es ${aux}`, "result")
  } else {
    printResult(`¡Hay empate! Las mejores vendedoras del mes son ${aux}`, "result")
  }
}

let btnVentasVend = e => {
  printResult (`Las ventas históricas de ${newInput(e).employee} son ARS ${salesByEmployee(newInput(e).employee)}`, "result")
}

let btnVentMes = e => {
  printResult (`Las ventas del mes son ${monthlySales(newInput(e).year,newInput(e).month)}`, "result")
}

let btnArtVend = e => {
  printResult (`El artículo más vendido de la historia es`,"result")
}

// let btnHuboVent = e => {
  
//   printResult (``,"result")
// }

// let btnVentSuc = e => {  
//   printResult (,"result")}

// let btnSucMes = e => {
//   printResult (,"result")
// }

//6. Funciones para los reportes
let renderByMonth = e => {
  printResult(`Las ventas por mes para el año ${e} son:`, "panel-body-one")
  // ver cómo imprimo tabla
}

let renderBySP = () => {
  printResult(`Las ventas históricas por sucursal son:`, "panel-body-two")
}

let otherRecords = () => {
  printResult(`El producto más vendido de la vida es "${bestSeller(data.prices)}"
  y la mejor empleada del universo es ${bestEmployee()}`, "panel-body-three")
}

//inicialización del programa
const initialize = () => {
    fillTable()
    let compDiv = document.getElementById("itemsData")
    createSelects (compTypes, compDiv)
    fillSelects(data.prices)
    fillSelects2(data.employees, "employees")
    fillSelects2(data.branchOffice, "branchOffice")
    renderByMonth(2019)
    renderBySP()
    otherRecords()
}