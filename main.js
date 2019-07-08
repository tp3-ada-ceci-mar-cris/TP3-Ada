let data = {
  employees: ["Cristina", "Marina", "Cecilia", "Rosalia"],

  sales: [
    { saleDate: new Date(2019, 2, 12), employeeName: "Cecilia", itemSold: ["Cartuchera unicornio", "Bata unicornio azul"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 12), employeeName: "Cecilia", itemSold: ["Esmalte unicornio", "Brocha unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 24), employeeName: "Cristina", itemSold: ["Bata unicornio rosa", "Vincha rígida unicornio"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 01), employeeName: "Rosalia", itemSold: ["Llavero unicornio", "Cartuchera unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 11), employeeName: "Cecilia", itemSold: ["Portacosméticos cute", "Bata unicornio azul"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 15), employeeName: "Rosalia", itemSold: ["Llavero pompón", "Cartuchera unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 12), employeeName: "Marina", itemSold: ["Vincha rígida unicornio", "Brocha unicornio"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 21), employeeName: "Cecilia", itemSold: ["Llavero unicornio", "Bata unicornio azul"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 08), employeeName: "Cristina", itemSold: ["Portacosméticos cute", "Bata unicornio rosa"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 16), employeeName: "Cristina", itemSold: ["Esmalte unicornio", "Cartuchera unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 27), employeeName: "Marina", itemSold: ["Llavero pompón", "Brocha unicornio"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 22), employeeName: "Cecilia", itemSold: ["Portacosméticos cute", "Bata unicornio rosa"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 05), employeeName: "Rosalia", itemSold: ["Vincha rígida unicornio", "Bata unicornio azul"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 01), employeeName: "Cecilia", itemSold: ["Llavero unicornio", "Bata unicornio rosa"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 2, 07), employeeName: "Cristina", itemSold: ["Esmalte unicornio", "Bata unicornio azul"], branchOffice : "Caballito"},
    { saleDate: new Date(2019, 2, 14), employeeName: "Rosalia", itemSold: ["Llavero pompón", "Brocha unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 1, 4), employeeName: "Cristina", itemSold: ["Esmalte unicornio", "Vincha rígida unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 1), employeeName: "Marina", itemSold: ["Esmalte unicornio", "Vincha rígida unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 2), employeeName: "Cristina", itemSold: ["Portacosméticos cute", "Llavero unicornio"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 10), employeeName: "Marina", itemSold: ["Portacosméticos cute", "Llavero pompón"], branchOffice : "Centro"},
    { saleDate: new Date(2019, 0, 12), employeeName: "Cecilia", itemSold: ["Esmalte unicornio", "Llavero pompón"], branchOffice : "Centro"}
  ],

  
  prices: [
    { id:"0001",type:"Beauty", item: "Esmalte unicornio", price: 200 },
    { id:"0002",type:"Props", item: "Vincha rígida unicornio", price: 120 },
    { id:"0003",type:"Beauty", item: "Portacosméticos cute", price: 250 },
    { id:"0004",type:"Props", item: "Llavero pompón", price: 100 },
    { id:"0005",type:"Props", item: "Llavero unicornio", price: 30 },
    { id:"0006",type:"Beauty", item: "Brocha unicornio", price: 90 },
    { id:"0007",type:"Clothing", item: "Bata unicornio rosa", price: 75 },
    { id:"0008",type:"Clothing", item: "Bata unicornio azul", price: 110 },
    { id:"0009",type:"Props", item: "Cartuchera unicornio", price: 230 }
  ]
}

// PUNTO1
//1. precioMaquina(componentes): 
let salePrice = sale => sale.length>0?sale.map(e => data.prices.find(({item}) => e === item).price).reduce((a,b)=>a+b):0

//esta parte es para probar
const maquina = ["Llavero pompón", "Vincha rígida unicornio", "Brocha unicornio", "Cartuchera unicornio"]
console.log(`(punto 1) La venta de ${maquina} tiene un valor total de ARS ${salePrice(maquina)}`)

//2. cantidadVentasComponente(componente): 
let timesSold = comp => data.sales.map(({itemSold}) => itemSold).flat().filter(e=>e==comp).length
  
// esta parte es para probar
const cosa="Esmalte unicornio"
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

//Mejor vendedora histórica
let bestEmployee = () =>{
  const girl = data.employees.map(name =>{
    return { name:name, sales:salePrice(data.sales.filter(({employeeName})=>employeeName===name).map(({itemSold})=>itemSold).flat())}
  })
  const bestGirl = Math.max(...girl.map(({sales})=>sales).flat())
  const a = girl.filter(({sales})=> sales>= bestGirl).map(({name})=>name).flat()
  return a
}
console.log(`La mejor vendedora de la historia es ${bestEmployee()}`)

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

  let anySales = (year,realMonth)=> {
    const month=realMonth-1
    const checkMonth= data.sales.find(({saleDate})=>month===saleDate.getMonth()&&year===saleDate.getFullYear())? true: false
    return checkMonth
  }
  
  //esta parte es para probar
  const anio4=2019
  const mes4 =4
  anySales(anio4,mes4)
    ?console.log(`(punto 7) Hubo ventas en el mes ${mes4} de ${anio4}`)
    :console.log(`(punto 7) No hubo ventas en el mes ${mes4} de ${anio4}`)
  
     
//PUNTO 2
//8. En las ventas ya existentes, agregar la propiedad sucursal con el valor Centro 
//Se hace a mano  

//9. agregar un array con las sucursales al objeto principal
data.branchOffice = ['Centro', 'Caballito']

//10. cargar nuevas ventas en el array correspondiente, en el objeto principal
//Se hizo a mano 

//11. ventasSucursal(sucursal)
let salesByBranchOffice = name => {
  const selectSalesBranchOffice = data.sales.filter(({branchOffice})=>branchOffice===name)
  let arrangeSalesBranchOffice = []
  selectSalesBranchOffice.forEach(({itemSold})=> itemSold.forEach(e=>arrangeSalesBranchOffice.push(e)))
  const branchOfficeRevenue = salePrice (arrangeSalesBranchOffice)
  return branchOfficeRevenue
}

//esta parte para probar` 
const sucursal = "Caballito"
console.log(`(punto 11) Las ventas históricas de ${sucursal} ascienden a ARS ${salesByBranchOffice(sucursal)}`)


//12. sucursalDelMes(mes, anio) 
let branchOfTheMonth = (year, month) => {
  const monthlySales = data.sales.filter(({saleDate})=>saleDate.getFullYear()===year && saleDate.getMonth()===month-1)
  const sPMonthlySales =data.branchOffice.map(office =>{
    return { office:office, sales:salePrice(monthlySales.filter(({branchOffice})=>branchOffice===office).map(({itemSold})=>itemSold).flat())}
  })
  const bestSale = Math.max(...sPMonthlySales.map(({sales})=>sales).flat())
  const bestOfficeList = sPMonthlySales.filter(({sales})=> sales>= bestSale).map(({office})=>office).flat()
  return bestOfficeList
  }

//esta parte es para probar
const anioCris=2019
const mesCris=1
console.log (`(punto 12) La sucursal con mejores ventas del mes ${mesCris} de ${anioCris} es ${branchOfTheMonth(anio2,mes2)}`) 

//PUNTO 3
//13. Reporte con las ventas por sucursal y por mes:
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
const anio3= 2019
console.log(`(punto 13) Las ventas por mes para el año ${anio} son:`)
console.table(monthlyReport(anio3))


//14. renderPorSucursal():
let listSalesBySP = listSP  =>
  listSP.map(
    sP => {
      let revenueBySP =salePrice((data.sales.filter(({branchOffice})=>branchOffice===sP).map(({itemSold})=>itemSold).flat()))
      return {branchOffice: sP, sales:revenueBySP}
    })

console.log(`(punto 14) Las ventas por sucursal son:`)
console.table(listSalesBySP(data.branchOffice))

//15. unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
let render = () =>{
  console.log(`Las ventas por mes para el año en curso son `)
  console.table(monthlyReport(2019))
  console.log(`El componente más vendido de la vida es ${bestSeller(data.prices)}`)
  console.log(`La mejor empleada de la vida es ${bestEmployee()}`)
  console.log(`Las ventas por sucursal son ARS`)
  console.table(listSalesBySP(data.branchOffice))
}
render()