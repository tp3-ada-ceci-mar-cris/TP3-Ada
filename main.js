let data = {
  employees: ["Cristina", "Marina", "Cecilia", "Brillantina"],

  sales: [
    { saleDate: new Date(2019, 1, 4), employeeName: "Cristina", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1500"]},
    { saleDate: new Date(2019, 0, 1), employeeName: "Marina", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1500"]},
    { saleDate: new Date(2019, 0, 2), employeeName: "Cristina", itemSold: ["Monitor ASC 543", "Motherboard MZI"]},
    { saleDate: new Date(2019, 0, 10), employeeName: "Marina", itemSold: ["Monitor ASC 543", "Motherboard ASUS 1200"]},
    { saleDate: new Date(2019, 0, 12), employeeName: "Cecilia", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1200"]},
    { saleDate: new Date(2019, 2, 12), employeeName: "Hedy", itemSold: ["Monitor GPRS 3000", "HDD Toyiva"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 24), employeeName: "Sheryl", itemSold: ["HDD Wezter Dishital", "Motherboard ASUS 1500"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 01), employeeName: "Ada", itemSold: ["Motherboard MZI", "RAM Quinston Fury"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 11), employeeName: "Grace", itemSold: ["Monitor ASC 543", "RAM Quinston"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 15), employeeName: "Ada", itemSold: ["Motherboard ASUS 1200", "RAM Quinston Fury"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 12), employeeName: "Hedy", itemSold: ["Motherboard ASUS 1500", "HDD Toyiva"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 21), employeeName: "Grace", itemSold: ["Motherboard MZI", "RAM Quinston"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 08), employeeName: "Sheryl", itemSold: ["Monitor ASC 543", "HDD Wezter Dishital"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 16), employeeName: "Sheryl", itemSold: ["Monitor GPRS 3000", "RAM Quinston Fury"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 27), employeeName: "Hedy", itemSold: ["Motherboard ASUS 1200", "HDD Toyiva"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 22), employeeName: "Grace", itemSold: ["Monitor ASC 543", "HDD Wezter Dishital"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 05), employeeName: "Ada", itemSold: ["Motherboard ASUS 1500", "RAM Quinston"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 01), employeeName: "Grace", itemSold: ["Motherboard MZI, HDD Wezter Dishital"], branchOffice : "Downtown"},
    { saleDate: new Date(2019, 2, 07), employeeName: "Sheryl", itemSold: ["Monitor GPRS 3000", "RAM Quinston"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 14), employeeName: "Ada", itemSold: ["Motherboard ASUS 1200", "HDD Toyiva"], branchOffice : "Downtown"}
  ],

  prices: [
    { id:"0001",type:"monitor", item: "Monitor GPRS 3000", price: 200 },
    { id:"0002",type:"mother", item: "Motherboard ASUS 1500", price: 120 },
    { id:"0003",type:"monitor", item: "Monitor ASC 543", price: 250 },
    { id:"0004",type:"mother", item: "Motherboard ASUS 1200", price: 100 },
    { id:"0005",type:"mother", item: "Motherboard MZI", price: 30 },
    { id:"0006",type:"HDD", item: "HDD Toyiva", price: 90 },
    { id:"0007",type:"HDD", item: "HDD Wezter Dishital", price: 75 },
    { id:"0008",type:"RAM", item: "RAM Quinston", price: 110 },
    { id:"0009",type:"RAM", item: "RAM Quinston Fury", price: 230 }
  ]
}

//1. precioMaquina(componentes): 
let salePrice = sale => sale.length>0?sale.map(e => data.prices.find(({item}) => e === item).price).reduce((a,b)=>a+b):0

//esta parte es para probar
const maquina = ["Motherboard ASUS 1200", "Motherboard ASUS 1500", "HDD Toyiva", "RAM Quinston Fury"]
console.log(`(punto 1) La venta de ${maquina} tiene un valor total de ARS ${salePrice(maquina)}`)

//2. cantidadVentasComponente(componente): 
let timesItWasSold = comp => data.sales.map(({itemSold}) => itemSold).flat().filter(e=>e==comp).length
  
// esta parte es para probar
const cosa="Monitor GPRS 3000"
console.log(`(punto 2) El ítem "${cosa}" fue vendido históricamente ${timesItWasSold(cosa)} veces`)

//3. vendedoraDelMes(mes, anio)
let employeeOfTheMonth = (year, month) => {
  const monthlySales = data.sales.filter(({saleDate})=>saleDate.getFullYear()===year && saleDate.getMonth()===month-1)
  const employeeMonthlySales =data.employees.map(name =>{
    return { name:name, sales:salePrice(monthlySales.filter(({employeeName})=>employeeName===name).map(({itemSold})=>itemSold).flat())}
  })
  const bestSale = Math.max(...employeeMonthlySales.map(({sales})=>sales).flat())
  const bestEmployeeList = employeeMonthlySales.filter(({sales})=> sales>= bestSale).map(({name})=>name).flat()
  return bestEmployeeList
  }

//esta parte es para probar
const anio2=2019
const mes2=2
console.log (`(punto 3) La mejor vendedora del mes ${mes2} de ${anio2} es ${employeeOfTheMonth(anio2,mes2)}`) 

//4. ventasVendedora(nombre)
let salesByEmployee = name => 
  salePrice(data.sales.filter(({employeeName})=>employeeName===name).map(({itemSold})=> itemSold).flat())

//esta parte para probar
const nombre = "Cecilia"
console.log(`(punto 4) Las ventas históricas de ${nombre} ascienden a ARS ${salesByEmployee(nombre)}`)

//5. ventasMes(mes, anio)
let monthlySales = (year, month) => 
  salePrice(data.sales.filter(({saleDate})=>saleDate.getFullYear()===year && saleDate.getMonth()===month-1).map(({itemSold})=>itemSold).flat())

//esta parte es para probar
const mes= 2
const anio=2019
console.log(`(punto 5) Las ventas del mes ${mes} de ${anio} ascienden a ARS ${monthlySales(anio,mes)}`)

//6. componenteMasVendido()
let bestSeller = salesList => {
  const salesByComponent = salesList.map(({item})=>{return {item:item, sales:timesItWasSold(item)}})
  console.log(salesByComponent)
  const bestNumber = Math.max(...salesByComponent.map(({sales})=>sales).flat())
  const bestSellerList = salesByComponent.filter(({sales})=> sales>= bestNumber).map(({item})=>item).flat()
  return bestSellerList
}

// esta parte es para probar
bestSeller(data.prices).length < 2 ? 
  console.log (`(punto 6) El componente históricamente más vendido es ${bestSeller(data.prices)}`) 
  : console.log (`(punto 6) Los componentes históricamente más vendidos son ${bestSeller(data.prices)}`)

//hasta acá Ceci-----

//7. huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) 
//hasta el 12 (diciembre).




     
    
//PUNTO 2
//2.a En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original). 
//let sucursal = "Centro"
//YA ESTA

//2.b agregar a cada venta (son objetos adentro de un array, adentro del objeto principal) la sucursal en la que se hizo
//YA ESTA

//2.c agregar un array con las sucursales al objeto principal

data.branchOffice = ['Downtown', 'Caballito']
console.log(data)

//2.d cargar nuevas ventas en el array correspondiente, en el objeto principal
//YA ESTA CARGADO A MANO

//2.e Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
//Adaptar la función de total de ventas por vendedora para que también sirva para total de ventas por sucursal

let salesByBranchOffice = name => {
  const selectSalesBranchOffice = data.sales.filter(({branchOffice})=>branchOffice===name)
  let arrangeSalesBranchOffice = []
  selectSalesBranchOffice.forEach(({itemSold})=> itemSold.forEach(e=>arrangeSalesBranchOffice.push(e)))
  const branchOfficeRevenue = salePrice (arrangeSalesBranchOffice)
  return branchOfficeRevenue
}

//esta parte para probar` 
const sucursal = "Caballito"
console.log(`(punto 2.e) Las ventas históricas de ${sucursal} ascienden a ARS ${salesByBranchOffice(sucursal)}`)


//12.f Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la 
//sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el 
//que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).  
//(ver si no se parece a vendedora del mes)

let branchOfficeOfTheMonth = (year, realMonth) => {
  let month = realMonth-1
  let monthSalesByBranchOffice = []
  let branchOfficeMonthlySale = data.branchOffice.forEach(name=> {
      let arrangeSales = []
      data.sales.forEach(({saleDate, branchOfficeName, itemSold})=> {
          if (saleDate.getFullYear()===year && saleDate.getMonth()===month && branchOfficeName===name) {
              itemSold.forEach(e=>arrangeSales.push(e))}
          return arrangeSales
      })
      monthSalesByBranchOffice.push (salePrice(arrangeSales))
      return monthSalesByBranchOffice
  })
  const bestNumber = Math.max(...monthSalesByBranchOffice)

  let bestSellerList =[]

  let funcionCasiRepetida = data.branchOffice.forEach(name=> {
      let arrangeSales = []
      data.sales.forEach(({saleDate, branchOfficeName, itemSold})=> {
          if (saleDate.getFullYear()===year && saleDate.getMonth()===month && branchOfficeName===name) {
              itemSold.forEach(e=>arrangeSales.push(e))}
          return arrangeSales
      })
      if (salePrice(arrangeSales)>=bestNumber) {
      bestSellerList.push(name)
      }
      return bestSellerList
  })
  return bestSellerList
}

//esta parte es para probar
const anioCris=2019
const mesCris=1
console.log (`(punto 12.f) La sucursal con mejores ventas del mes ${mesCris} de ${anioCris} es ${branchOfficeOfTheMonth(anio2,mes2)}`) 

// -----hasta acá Cris

//13. Un reporte que diga las ventas por sucursal y por mes, para eso:
//13.a. renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

let monthlyRender = () => {
  let january = []
  let february = []
  data.sales.forEach(e => {
    let month = e.saleDate.getMonth()
    switch (month) { // AGREGAR CASOS PARA TODOS LOS MESES
      case 0:
        january.push(e.itemSold);
        break;
      case 1:
        february.push(e.itemSold);
    }
  })

  console.log(january)

  let januaryTotalSales = () => {
    let januarySales = 0
    january.forEach(e => {
      let item = data.prices.filter(({item}) => e === item) // NaN ?????
      januarySales += e.price
    })
    return januarySales
  }

  januaryTotalSales()

  let februarySales = 0
  february.forEach(e => {
    let item = data.prices.filter(({item}) => e === item)
    let februaryTotal = februarySales + item.price
    return februaryTotal
  })

  console.log(`Ventas por mes
  Total de enero 2019: ${januarySales}
  Total de febrero 2019: ${februaryTotal}`)
}

monthlyRender()

//13.b. renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
//13.c. render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido 
//y la vendedora que más ingresos generó