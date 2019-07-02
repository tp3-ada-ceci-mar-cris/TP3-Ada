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


// quiero que tome el input de cosas y arme un objeto:

const newInput = e=> {
    let input = {products:[], employee:undefined, year:undefined, month:undefined}
    compTypes.forEach(e => {
        let select = document.getElementById(e)
        let product = data.prices.find(e=>e.id===select.value)
        input.products.push(product)
    })
    
    input.employee  = document.getElementById("employees").value
    input.year = document.getElementById("year").value
    input.month=document.getElementById("month").value
    console.log(input)

}



// const createOrder =() => {
//     let order ={plateSelection:[], toPrepare:true, id:""}
//     plateTypes.forEach (e=> {
//         let select =document.getElementById(e)
//         let plate = menu.find(e=>e.id===select.value)
//         console.log(plate)
//         order.plateSelection.push(plate)
//         select.value=""
//     })
//     order.id=`order00${orderList.length}`
//     orderList.push(order)
//     printOrders()
// }
// un array con las cosas a vender
// la vendedora si hay
// la sucursal si hay
// el mes y el año si hay



//inicialización del programa
const initialize = () => {
    fillTable()
    let compDiv = document.getElementById("itemsData")
    createSelects (compTypes, compDiv)
    fillSelects(data.prices)
    fillSelects2(data.employees, "employees")
    fillSelects2(data.branchOffice, "branchOffice")
    fillOptions()
    // printOrders()
}