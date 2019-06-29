let data = {
  employees: ["Cristina", "Marina", "Cecilia", "Agustina"],

  sales: [
    { saleDate: new Date(2019, 2, 12), employeeName: "Cecilia", itemSold: ["Monitor GPRS 3000", "HDD Toyiva"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 24), employeeName: "Cristina", itemSold: ["HDD Wezter Dishital", "Motherboard ASUS 1500"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 01), employeeName: "Agustina", itemSold: ["Motherboard MZI", "RAM Quinston Fury"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 11), employeeName: "Cecilia", itemSold: ["Monitor ASC 543", "RAM Quinston"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 15), employeeName: "Agustina", itemSold: ["Motherboard ASUS 1200", "RAM Quinston Fury"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 12), employeeName: "Marina", itemSold: ["Motherboard ASUS 1500", "HDD Toyiva"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 21), employeeName: "Cecilia", itemSold: ["Motherboard MZI", "RAM Quinston"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 08), employeeName: "Cristina", itemSold: ["Monitor ASC 543", "HDD Wezter Dishital"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 16), employeeName: "Cristina", itemSold: ["Monitor GPRS 3000", "RAM Quinston Fury"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 27), employeeName: "Marina", itemSold: ["Motherboard ASUS 1200", "HDD Toyiva"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 22), employeeName: "Cecilia", itemSold: ["Monitor ASC 543", "HDD Wezter Dishital"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 05), employeeName: "Agustina", itemSold: ["Motherboard ASUS 1500", "RAM Quinston"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 01), employeeName: "Cecilia", itemSold: ["Motherboard MZI", "HDD Wezter Dishital"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 07), employeeName: "Cristina", itemSold: ["Monitor GPRS 3000", "RAM Quinston"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 14), employeeName: "Agustina", itemSold: ["Motherboard ASUS 1200", "HDD Toyiva"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 1, 4), employeeName: "Cristina", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 1), employeeName: "Marina", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 2), employeeName: "Cristina", itemSold: ["Monitor ASC 543", "Motherboard MZI"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 10), employeeName: "Marina", itemSold: ["Monitor ASC 543", "Motherboard ASUS 1200"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 12), employeeName: "Cecilia", itemSold: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], branchOffice : "Centro"}
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
let timesSold = comp => data.sales.map(({itemSold}) => itemSold).flat().filter(e=>e==comp).length
  
// esta parte es para probar
const cosa="Monitor GPRS 3000"
console.log(`(punto 2) El ítem "${cosa}" fue vendido históricamente ${timesSold(cosa)} veces`)

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

let bestEmployee = () =>{
  const girl = data.employees.map(name =>{
    return { name:name, sales:salePrice(data.sales.filter(({employeeName})=>employeeName===name).map(({itemSold})=>itemSold).flat())}
  })
  const bestGirl = Math.max(...girl.map(({sales})=>sales).flat())
  const a = girl.filter(({sales})=> sales>= bestGirl).map(({name})=>name).flat()
  return a
}
console.log(bestEmployee())

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
  const salesByComponent = salesList.map(({item})=>{return {item:item, sales:timesSold(item)}})
  
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

//7. huboVentas(mes, anio): 
let checkMonth = (year,realMonth)=> {
  const month=realMonth-1
  const hay= data.sales.find(({saleDate})=>month===saleDate.getMonth()&&year===saleDate.getFullYear())
  hay?console.log(`(punto 7) Hubo ventas en el mes ${realMonth} de ${year}`)
      :console.log(`(punto 7) No hubo ventas en el mes ${realMonth} de ${year}`)
}

//esta parte es para probar
const anio4=2019
const mes4 =3
checkMonth (anio4,mes4)

   
//PUNTO 2
//2.a En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original). 
//let sucursal = "Centro"
//YA ESTA

//2.b agregar a cada venta (son objetos adentro de un array, adentro del objeto principal) la sucursal en la que se hizo
//YA ESTA

//2.c agregar un array con las sucursales al objeto principal

data.branchOffice = ['Centro', 'Caballito']
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
let monthlyReport = year=> {
  let saleByMonth =[
      {month:"enero", sales:undefined},
      {month:"febrero", sales:undefined},
      {month:"marzo", sales:undefined},
      {month:"abril", sales:undefined},
      {month:"mayo", sales:undefined},
      {month:"junio", sales:undefined},
      {month:"julio", sales:undefined},
      {month:"agosto", sales:undefined},
      {month:"septiembre", sales:undefined},
      {month:"octubre", sales:undefined},
      {month:"noviembre", sales:undefined},
      {month:"diciembre", sales:undefined},
  ]
  saleByMonth.map((eachMonth,i)=>{
      eachMonth.sales = (monthlySales(year,i+1))
  })
  return saleByMonth
}

//13.b. renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

// let listSalesBySP = listSP  =>
//   listSP.forEach(
//     sP => {
//       let cosa =salePrice((data.sales.filter(({branchOffice})=>branchOffice===sP).map(({itemSold})=>itemSold).flat()))
//       return{branchOffice: sP, sales:cosa} 
//     })

// console.log(listSalesBySP(data.branchOffice))

//13.c. render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido 
//y la vendedora que más ingresos generó

let render = () =>{
  console.log(monthlyReport(2019))
  console.log(bestSeller(data.prices))
  console.log(bestEmployee())
}
render()

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
    li.innerText = item.itemSold
  })

  data.sales.forEach(item => {
    const li = document.createElement('li')
    const branchList = document.getElementById('branchList')
    branchList.appendChild(li)
    li.innerText = item.branchOffice
  })
}