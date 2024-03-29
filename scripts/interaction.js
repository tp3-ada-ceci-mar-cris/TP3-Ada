//1. Para completar la tabla de ventas
const fillTable = () => {
  data.sales.sort(function (a, b) {
    return b.saleDate - a.saleDate
  })

  const dateList = document.getElementById('dateList')
  dateList.innerHTML = ""
  data.sales.forEach(item => {
    const li = document.createElement('li')
    dateList.appendChild(li)
    li.innerText = item.saleDate.toLocaleDateString()
  })

  const nameList = document.getElementById('nameList')
  nameList.innerHTML = ""
  data.sales.forEach(item => {
    const li = document.createElement('li')
    nameList.appendChild(li)
    li.innerText = item.employeeName
  })

  const itemList = document.getElementById('itemList')
  itemList.innerHTML = ""
  data.sales.forEach(item => {
    const li = document.createElement('li')
    itemList.appendChild(li)
    li.innerText = item.itemSold.join(`, `)
  })

  const branchList = document.getElementById('branchList')
  branchList.innerHTML = ""
  data.sales.forEach(item => {
    const li = document.createElement('li')
    branchList.appendChild(li)
    li.innerText = item.branchOffice
  })

  const priceList = document.getElementById('priceList')
  priceList.innerHTML = ""
  data.sales.forEach(item => {
    const li = document.createElement('li')
    priceList.appendChild(li)
    li.innerText = salePrice(item.itemSold)
  })
}

const fillSale = (item) => {
  const container = document.getElementById("smallTable")
  container.innerHTML=""
  const list = document.createElement("ul")
  list.innerText=`Venta realizada:`
  container.appendChild(list)

  const date = document.createElement("li")
  date.innerText = `Fecha: ${item.saleDate.toLocaleDateString()}`
  list.appendChild(date)

  const branchOffice = document.createElement("li")
  branchOffice.innerText= `Sucursal: ${item.branchOffice}`
  list.appendChild(branchOffice)

  const employee = document.createElement("li")
  employee.innerText = `Vendedora: ${item.employeeName}`
  list.appendChild(employee)

  const itemSold = document.createElement("li")
  itemSold.innerText= `Productos vendidos: ${item.itemSold.join(`, `)}`
  list.appendChild(itemSold)

  const price = document.createElement("li")
  price.innerText= `Precio: ${salePrice(item.itemSold)}`
  list.appendChild(price)
}

//2. Para completar las opciones del modal
const fillOptions = () => {
  data.employees.forEach(name => {
    let option = document.createElement('option')
    option.innerText = name
    option.value = name
    let nameSelector = document.getElementById('selectEmployeeName')
    nameSelector.appendChild(option)
    return option
  })

  const itemList = data.prices.map(({
    item
  }) => item)

  const idList = data.prices.map(({
    id
  }) => id)

  for (i = 0; i < itemList.length; i++) {
    productSelector = document.getElementById('selectItemSold')
    const newLabel = document.createElement('label')
    newLabel.setAttribute('for', itemList[i])

    const newLabelTextNode = document.createTextNode(itemList[i])
    newLabel.appendChild(newLabelTextNode)

    const newInput = document.createElement('input')
    newInput.setAttribute('id', idList[i])
    newInput.setAttribute('type', 'checkbox')
    newInput.setAttribute('value', itemList[i])
    newInput.setAttribute('name', 'productCheckbox')

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

  $('[data-dismiss=modal]').on('click', function (e) {
    var $t = $(this),
      target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];

    $(target)
      .find("input[type=checkbox], input[type=radio]")
      .prop("checked", "")
      .end();
  })
  }

//3. Para crear nuevas ventas  
const createSale = () => {
  let saleDateField = document.getElementById('enterSaleDate')
  let d = new Date(saleDateField.value)
  let finalDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
  let employeeNameField = document.getElementById('selectEmployeeName')
  let productCheckbox = document.getElementsByName('productCheckbox')
  let selectedItems = []
  for (let i = 0; i < productCheckbox.length; i++) {
    if (productCheckbox[i].type == 'checkbox' && productCheckbox[i].checked == true)
      selectedItems.push(productCheckbox[i].value)
  }
  let branchOfficeField = document.getElementById('selectBranchOffice')
  let newSale = {
    saleDate: new Date(finalDate),
    employeeName: employeeNameField.value,
    itemSold: selectedItems,
    branchOffice: branchOfficeField.value
  }
  data.sales.unshift(newSale)
  fillTable()
  fillSale(newSale)
}

//4. Para armar selects y opciones en las estadísticas
//4.a funcion de crear una opción
const createOption = comp => {
  typeof comp === "object" ? e = comp.item : e = comp
  const option = document.createElement("option")
  option.innerText = e
  option.value = e
  return option
}

//4.b una función para poblar los selects
const fillSelects = (list, type) => {
  const select = document.getElementById(type)
  list.forEach(e => {
    if (!select.childElementCount) {
      const placeholder = {
        item: `Seleccione opción`,
        id: ""
      }
      select.appendChild(createOption(placeholder))
    }
    select.appendChild(createOption(e))
  })
}

//5. Función que agarra el input y me da un conjunto de datos que pueda usar en la botonera
const newInput = () => {
  const input = {
    product: undefined,
    employee: undefined,
    branchOffice: undefined,
    year: undefined,
    month: undefined
  }
  
  input.product = document.getElementById("itemsData").value
  input.employee = document.getElementById("employees").value
  input.branchOffice = document.getElementById("branchOffice").value
  const auxDate = new Date(document.getElementById("year").value)
  input.year = auxDate.getFullYear()
  input.month = auxDate.getMonth() + 1
  return input
}

//6. Función que imprime al costado el resultado
const printResult = (what, where) => {
  const container = document.getElementById(where)
  container.innerHTML = ""
  container.innerText = what
}

//7. Funciones para la botonera
const btnPrecioVenta = e => {
  const price = e => data.prices.find(({
    item
  }) => newInput(e).product === item).price
  if (newInput(e).product !== `Seleccione opción`) {
    printResult(`El precio de venta de ${newInput(e).product} es ARS ${price(e)}`, "result")
  } else {
    printResult(`No hay artículo seleccionado`, "result")
  }
}

const btnVtasArticulo = e => {
  if (newInput(e).product !== `Seleccione opción`) {
    printResult(`El ítem "${newInput(e).product}" fue vendido históricamente ${timesSold(newInput(e).product)} veces`, "result")
  } else {
    printResult(`No hay artículo seleccionado`, "result")
  }
}

const btnVendMes = e => {
  const aux = employeeOfTheMonth(newInput(e).year, newInput(e).month)
  if (anySales(newInput(e).year, newInput(e).month)) {
    if (aux.length < 2) {
      printResult(`La mejor vendedora del mes es ${aux}`, "result")
    } else {
      printResult(`¡Hay empate! Las mejores vendedoras del mes son ${aux.join(`, `)}`, "result")
    }
  } else {
    printResult(`No hubo ventas en el mes indicado`, "result")
  }
}

const btnVentasVend = e => {
  if (newInput(e).employee !== `Seleccione opción`) {
    printResult(`Las ventas históricas de ${newInput(e).employee} son ARS ${salesByEmployee(newInput(e).employee)}`, "result")
  } else {
    printResult(`No hay vendedora seleccionada`, "result")
  }
}

const btnVentMes = e => {
  printResult(`Las ventas del mes son ARS ${monthlySales(newInput(e).year,newInput(e).month)}`, "result")
}

const btnArtVend = () => {
  printResult(`El artículo más vendido de la historia es ${bestSeller(data.prices)}`, "result")
}

const btnMejVend = () => {
  const aux = bestEmployee()
  if (aux.length < 2) {
    printResult(`La mejor vendedora de la historia es ${aux}`, "result")
  } else {
    printResult(`Las mejores vendedoras de la historia son ${aux.join(`, `)}`, "result")
  }
}

const btnVentSuc = e => {
  if (newInput(e).branchOffice !== `Seleccione opción`) {
    printResult(`La sucursal ${newInput(e).branchOffice} vendió ARS ${salesByBranchOffice(newInput(e).branchOffice)} desde que comenzó sus operaciones`, "result")
  } else {
    printResult(`No hay sucursal seleccionada`, "result")
  }
}

const btnSucMes = e => {
  const aux = branchOfTheMonth(newInput(e).year, newInput(e).month)
  if (anySales(newInput(e).year, newInput(e).month)) {
    if (aux.length < 2) {
      printResult(`La sucursal que más vendió este mes fue ${aux}`, "result")
    } else {
      printResult(`¡Hay empate! Las sucursales que más vendieron este mes son ${aux}`, "result")
    }
  } else {
    printResult(`No hubo ventas en el mes indicado`, "result")
  }
}

const report = () => {
  if (anySales(new Date().getFullYear, new Date().getMonth + 1)) {
    printResult(employeeOfTheMonth(new Date().getMonth + 1).join(`, `), "bestEmployee")
  } else {
    printResult(`Aún no hay ventas este mes.`, "bestEmployee")
  }

  const monthlyContainer = document.getElementById("monthSales")
  const salesByMonth = monthlyReport(2019)
  const listContainer = document.createElement("ul")
  monthlyContainer.appendChild(listContainer)
  salesByMonth.forEach(e => {
    if (e.sales) {
      const li = document.createElement("li")
      li.innerText = `${e.month}: $${e.sales}`
      listContainer.appendChild(li)
    }
  })

  printResult(`${bestSeller(data.prices)}`, "bestProduct")

  const boContainer = document.getElementById("boSales")
  const salesByBO = listSalesBySP(data.branchOffice)
  const listContainer2 = document.createElement("ul")
  boContainer.appendChild(listContainer2)
  salesByBO.forEach(e => {
    const li = document.createElement("li")
    li.innerText = `${e.branchOffice}: $${e.sales}`
    listContainer2.appendChild(li)
  })
}

//inicialización del programa
const initialize = () => {
  fillTable()
  fillOptions()
  fillSelects(data.prices, "itemsData")
  fillSelects(data.employees, "employees")
  fillSelects(data.branchOffice, "branchOffice")
  report()
}