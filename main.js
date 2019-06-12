var data = {
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
  };

//1. precioMaquina(componentes): 
//recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, 
//que es la suma de los precios de cada componente incluido.

//recorre el Array, para cada elemento lo busca data.prices, te da el precio y lo acumula en una variable
let precioMaquina = (maquina) => {
  var precioFinal = 0
  maquina.forEach(e => {
    let componente = data.prices.find(({item}) => e === item)
    precioFinal = precioFinal + componente.price
  })
  console.log(`Acá te paso el total: $${precioFinal}`)
}

//2.cantidadVentasComponente(componente): 
//recibe un componente y devuelve la cantidad de veces que fue vendido, 
//o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, 
//se asume que está identificada por la variable ventas.

// let cosa="Monitor GPRS 3000"

let cantidadVentasComponente = (cosa) => {
    let acumulado = []
    data.sales.forEach(({itemSold}) => itemSold.forEach(e =>acumulado.push(e)))
    let totalComponente =acumulado.filter(e=>e===cosa).length
    console.log(`El componente ${cosa} se vendió ${totalComponente} veces`)
}

cantidadVentasComponente("Monitor GPRS 3000")

//3.vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y
// devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, 
//sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. 
//El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).




//4.ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
//quiero que en todas las ventas busque el nombre que le di, traiga el item sold y me acumule el precio

let ventasVendedora = (nombrePiba)=>{
  let lasVentasDeLaPiba = data.sales.filter(({employeeName})=>employeeName===nombrePiba)
  let acaLoGuardo = []
  lasVentasDeLaPiba.forEach(({itemSold})=>itemSold.forEach(e=>acaLoGuardo.push(e)))
  console.log(acaLoGuardo)
  precioMaquina(acaLoGuardo)
}

ventasVendedora("Cecilia")


//5.ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

// así le pido año y mes
const year = data.sales[0].saleDate.getFullYear()
const month =data.sales[0].saleDate.getMonth()
console.log(year, month)

// esta condición sobre año y mes funciona
const anio =2019
const mes = 1
if (data.sales[0].saleDate.getFullYear() === anio && data.sales[0].saleDate.getMonth()===mes){console.log('felicidad')}

//esto me trae lo que vendí si es el objeto tiene ese día y mes
if (data.sales[0].saleDate.getFullYear() === anio && data.sales[0].saleDate.getMonth()===mes){
  let venta=data.sales[0].itemSold
  console.log(venta)
}

//ahora quiero que me diga cuánto es esa venta
if (data.sales[0].saleDate.getFullYear() === anio && data.sales[0].saleDate.getMonth()===mes){
  let venta=data.sales[0].itemSold
  let precioFinal = 0
  venta.forEach(e => {
    let componente = data.prices.find(({item}) => e === item)
    precioFinal = precioFinal + componente.price
  })
  console.log(precioFinal)
}

//ahora pruebo recorrer todo el array y que me devuelva solo los que son de ese año y mes
let ventasMes = ()=>{  
  let todasLasVentas=0
  data.sales.map(({saleDate,itemSold})=>{
      if (saleDate.getFullYear()===anio && saleDate.getMonth()===mes) {
      const venta=[...itemSold]
      let precioFinal = 0
      venta.forEach(e => {
        const componente = data.prices.find(({item}) => e === item)
        precioFinal = precioFinal + componente.price
      })
      todasLasVentas=todasLasVentas+precioFinal
      }
  })
  console.log(`Este es el resultado de todasLasVentas: ${todasLasVentas} para el mes ${mes}/${anio}`)
}

/// queda resolver cómo me pasan el mes. Tal vez sea lo que me pasan +1? y usar la función precioMaquina que en la primera vuelta no andaba bien pero croe que se solucionó

//6.componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es 
//el que indica la función cantidadVentasComponente

//¿cuántos componentes hay que no se repitan? podria recorrer todo y generar tantas "variables de acumulación "


// hasta acá Ceci-----

//7. huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) 
//hasta el 12 (diciembre).


   
    
    
//PUNTO 2
//2.a En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original). 
//let sucursal = "Centro"
data.sales.forEach(e =>{
  e.sucursal = "Centro"
}) 
 
console.log(data.sales)


//8. agregar a cada venta (son objetos adentro de un array, adentro del objeto principal) la sucursal en la que se hizo

//9. agregar un array con las sucursales al objeto principal

//10. cargar nuevas ventas en el array correspondiente, en el objeto principal

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