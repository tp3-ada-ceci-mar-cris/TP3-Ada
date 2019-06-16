let data = {
  employees: ["Cristina", "Marina", "Cecilia", "Brillantina"],

  sales: [
    { saleDate: new Date(2019, 1, 4), employeeName: "Cristina", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { saleDate: new Date(2019, 0, 1), employeeName: "Marina", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { saleDate: new Date(2019, 0, 2), employeeName: "Cristina", itemSold: ["Monitor ASC 543", "Motherboard MZI"] },
    { saleDate: new Date(2019, 0, 10), employeeName: "Marina", itemSold: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { saleDate: new Date(2019, 0, 12), employeeName: "Cecilia", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  prices: [
    { id:0001,type:"monitor", item: "Monitor GPRS 3000", price: 200 },
    { id:0002,type:"mother", item: "Motherboard ASUS 1500", price: 120 },
    { id:0003,type:"monitor", item: "Monitor ASC 543", price: 250 },
    { id:0004,type:"mother", item: "Motherboard ASUS 1200", price: 100 },
    { id:0005,type:"mother", item: "Motherboard MZI", price: 30 },
    { id:0006,type:"HDD", item: "HDD Toyiva", price: 90 },
    { id:0007,type:"HDD", item: "HDD Wezter Dishital", price: 75 },
    { id:0008,type:"RAM", item: "RAM Quinston", price: 110 },
    { id:0009,type:"RAM", item: "RAM Quinston Fury", price: 230 }
  ]
}

//1. precioMaquina(componentes): 
let salePrice = sale => {
  let salePrice = 0
  sale.forEach(e => {
      const component = data.prices.find(({item}) => e === item)
      salePrice = salePrice + component.price
  })
  return salePrice
}

//esta parte es para probar
const maquina = ["Motherboard ASUS 1500", "Motherboard ASUS 1500", "HDD Toyiva", "RAM Quinston Fury"]
console.log(`(punto 1) La venta de ${maquina} tiene un valor total de ARS ${salePrice(maquina)}`)

//2. cantidadVentasComponente(componente): 
let timesItWasSold = component => {
  let totalSales = []
  data.sales.forEach(({itemSold}) => itemSold.forEach(e =>totalSales.push(e)))
  const totalComponent =totalSales.filter(e=>e===component).length
  return totalComponent
}
  
// esta parte es para probar
const cosa="Monitor GPRS 3000"
console.log(`(punto 2) El ítem "${cosa}" fue vendido históricamente ${timesItWasSold(cosa)} veces`)

//3. vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y
// devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, 
//sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. 
//El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

//recorro la lista de vendedoras - en cada iteración me da las ventas del mes de una vendedora


let employeMonthlySale = data.employees.map (name=> {
  let arrangeSales = []
  data.sales.forEach(({saleDate, employeeName, itemSold})=> {
      if (saleDate.getFullYear()===2019 && saleDate.getMonth()===1 && employeeName===name) {
          itemSold.forEach(e=>arrangeSales.push(e))}
      return arrangeSales
  })
  console.log( salePrice(arrangeSales)      )
})
// console.log (employeeMonthlySale)

// const bestEmployeeSale = Math.max(...employeeMonth)

console.log(`(punto 3) No sé ni por dónde empezar`)

//4. ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
let salesByEmployee = name => {
  const selectSalesEmployee = data.sales.filter(({employeeName})=>employeeName===name)
  let arrangeSalesEmployee = []
  selectSalesEmployee.forEach(({itemSold})=> itemSold.forEach(e=>arrangeSalesEmployee.push(e)))
  const employeeRevenue = salePrice (arrangeSalesEmployee)
  return employeeRevenue
}

//esta parte para probar
const nombre = "Cristina"
console.log(`(punto 4) Las ventas históricas de ${nombre} ascienden a ARS ${salesByEmployee(nombre)}`)

//5. ventasMes(mes, anio)
let monthlySales = (year, realMonth) => {
  const month=realMonth-1
  let eachSale=[]
  data.sales.forEach(({saleDate,itemSold})=>{
      if (saleDate.getFullYear()===year && saleDate.getMonth()===month) {
          itemSold.forEach (e=> eachSale.push(e))
      }
  })
  const monthRevenue = salePrice(eachSale)
  return monthRevenue
}

//esta parte es para probar
const mes= 2
const anio=2019
console.log(`(punto 5) Las ventas del mes ${mes} de ${anio} ascienden a ARS ${monthlySales(anio,mes)}`)

//6. componenteMasVendido()
let bestSeller = salesList => {
  const salesByComponent = salesList.map(({item})=>timesItWasSold(item))
  const bestNumber = Math.max(...salesByComponent)
  
  let bestSellerList =[]
  data.prices.map(({item})=> timesItWasSold(item)>= bestNumber ? bestSellerList.push(item) :null)
  return bestSellerList
}

//esta parte es para probar
bestSeller(data.prices).length < 2 ? 
  console.log (`(punto 6) El componente históricamente más vendido es ${bestSeller(data.prices)}`) 
  : console.log (`(punto 6) Los componentes históricamente más vendidos son ${bestSeller(data.prices)}`)

//hasta acá Ceci-----

//7. huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) 
//hasta el 12 (diciembre).


   
    
    
//PUNTO 2
//2.a En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original). 
//let sucursal = "Centro"
//8. agregar a cada venta (son objetos adentro de un array, adentro del objeto principal) la sucursal en la que se hizo

data.sales.forEach(e =>{
  e.branchOffice = "Downtown"
}) 
console.log(data.sales)

//9. agregar un array con las sucursales al objeto principal

data.branchOffice = ['Downtown', 'Caballito']
console.log(data)


//10. cargar nuevas ventas en el array correspondiente, en el objeto principal
let newSales = [
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
]
let newSale = {
  saleDate: new Date,
  employeeName: 
  
}
newSales.push(newSale)

console.log(data.sales)


//11.Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
//Adaptar la función de total de ventas por vendedora para que también sirva para total de ventas por sucursal

//12.Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la 
//sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el 
//que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).  
//(ver si no se parece a vendedora del mes)

// -----hasta acá Cris

//13. Un reporte que diga las ventas por sucursal y por mes, para eso:
//13.a. renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

// let renderPorMes = () => {
//   let january = []
//   let february = []
//   data.sales.map(e => {
//     let month = e.saleDate.getMonth()
//     if (month == 0) {
//       january.push(e)
//     } else {
//       february.push(e)
//     }
//   })

//   let retrievePrices = data.prices.map(e => {

//   })

//   console.log(`Ventas por mes
//   Total de enero 2019: ${january}
//   Total de febrero 2019: ${february}`)
// }

// renderPorMes()

//13.b. renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
//13.c. render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido 
//y la vendedora que más ingresos generó