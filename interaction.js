//1. Para completar la tabla de ventas
const fillTable = () => {
    data.sales.sort(function(a, b) {
        return b.saleDate - a.saleDate
      })
    
    const dateList = document.getElementById('dateList')
    dateList.innerHTML=""
    data.sales.forEach(item => {
      const li = document.createElement('li')
      dateList.appendChild(li)
      li.innerText = item.saleDate.toLocaleDateString()
    })
  
    const nameList = document.getElementById('nameList')
    nameList.innerHTML=""
    data.sales.forEach(item => {
      const li = document.createElement('li')
      nameList.appendChild(li)
      li.innerText = item.employeeName
    })
  
    const itemList = document.getElementById('itemList')
    itemList.innerHTML=""
    data.sales.forEach(item => {
      const li = document.createElement('li')
      itemList.appendChild(li)
      if (item.length>1){
        li.innerText = item.itemSold.join(`, `)
      }else {
        li.innerText = item.itemSold
      }
    })
  
    const branchList = document.getElementById('branchList')
    branchList.innerHTML=""
    data.sales.forEach(item => {
      const li = document.createElement('li')
      branchList.appendChild(li)
      li.innerText = item.branchOffice
    })
  }

  // Para completar las opciones del modal
  const fillOptions = () => {
    data.employees.forEach(name => {
      let option = document.createElement('option')
      option.innerText = name
      option.value = name
      let nameSelector = document.getElementById('selectEmployeeName')
      nameSelector.appendChild(option)
      return option
    })
  
    const itemList = data.prices.map(({item}) => item)
    const idList = data.prices.map(({id}) => id)
   
    for(i = 0; i < itemList.length; i++) {
      productSelector = document.getElementById('selectItemSold')
      const newLabel = document.createElement('label')
      newLabel.setAttribute('for', itemList[i])
      // newLabel.setAttribute('class', 'material-label')
  
      const newLabelTextNode = document.createTextNode(itemList[i])
      newLabel.appendChild(newLabelTextNode)
  
      const newInput = document.createElement('input')
      // newInput.className = 'shoe-materials'
      // newInput.setAttribute('class', 'shoe-materials')
      newInput.setAttribute('id', idList[i])
      // newInput.setAttribute('name', 'materials')
      newInput.setAttribute('type', 'checkbox')
      newInput.setAttribute('value', idList[i])
       
  
      productSelector.appendChild(newLabel)    
      $(newLabel).after(newInput)        
  }
  
    data.branchOffice.forEach(branch => {
      let option = document.createElement('option')
      option.innerText = branch
      option.value = branch
      let branchSelector = document.getElementById('selectBranchOffice')
      branchSelector.appendChild(option)
      return option
    })
  }

//2. Para crear nuevas ventas
// Modelo de nueva venta
// function sale(saleDate, employeeName, itemSold, branchOffice) {
//     this.saleDate = new Date(saleDate)
//     this.employeeName = employeeName
//     this.itemSold = itemSold
//     this.branchOffice = branchOffice
//   }
  
const createSale = () => {
  let saleDateField = document.getElementById('enterSaleDate')
  let employeeNameField = document.getElementById('selectEmployeeName')
  let itemSoldField = document.getElementById('selectItemSold')
  let branchOfficeField = document.getElementById('selectBranchOffice')
  let newSale = {saleDate:new Date (saleDateField.value), employeeName:employeeNameField.value, itemSold:itemSoldField.value, branchOffice:branchOfficeField.value}
  data.sales.unshift(newSale) 
  console.log(newSale)
  fillTable()// FALTA HACER QUE APAREZCA LA NUEVA VENTA, Y QUE SE CIERRE EL MODAL
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
    let input = {products:[], employee:undefined, branchOffice: undefined, year:undefined, month:undefined}
    compTypes.forEach(e => {
        let select = document.getElementById(e)
        let product = data.prices.find(e=>e.id===select.value)
        input.products.push(product.item)
    })
    
    input.employee  = document.getElementById("employees").value
    input.branchOffice=document.getElementById("branchOffice").value
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

let btnHuboVent = e => {
  const anySales= data.sales.find(({saleDate})=>newInput(e).month===saleDate.getMonth()&&newInput(e).year===saleDate.getFullYear())
  if (anySales) {
    printResult(`Hubo ventas en el mes`, "result")
  } else {
    printResult(`No hubo ventas en el mes`, "result")
  }
}

let btnVentSuc = e => {  
  printResult (`La sucursal ${newInput(e).branchOffice} vendió ARS ${salesByBranchOffice(newInput(e).branchOffice)} desde que comenzó sus operaciones`,"result")}

let btnSucMes = e => {
  printResult (`La sucursal que más vendió este mes fue ${branchOfTheMonth(newInput(e).year,newInput(e).month)}`,"result")
}

//6. Funciones para los reportes
let renderByMonth = e => {
  printResult(`Las ventas por mes para el año ${e} son:`, "panel-body-one")
  // ver cómo imprimo tabla
}

let renderBySP = () => {
  printResult(`Las ventas históricas por sucursal son:`, "panel-body-two")
  // ver cómo imprimo tabla
}

let otherRecords = () => {
  printResult(`El producto más vendido de la vida es "${bestSeller(data.prices)}"
  y la mejor empleada del universo es ${bestEmployee()}`, "panel-body-three")
}

//inicialización del programa
const initialize = () => {
    fillTable()
    fillOptions()
    let compDiv = document.getElementById("itemsData")
    let compDiv2 =document.gete
    createSelects (compTypes, compDiv)
    // createSelects (compTypes,)
    fillSelects(data.prices)
    fillSelects2(data.employees, "employees")
    fillSelects2(data.branchOffice, "branchOffice")
    fillSelects (data.prices)
    renderByMonth(2019)
    renderBySP()
    otherRecords()
}