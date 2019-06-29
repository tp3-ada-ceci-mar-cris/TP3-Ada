//1. identificar tipos de componentes
//1.a. extraigo tipos de componentes
const allTypes = data.prices.map(({type}) =>type)
//1.b. filtro para que no se repitan
const compTypes =allTypes.filter((e,i)=> allTypes.indexOf(e) === i)

//2. genero selecs por cada tipo de componente
const createSelects =(list, container) => {
    list.forEach(e=> {
        let select = document.createElement("select")
        select.id=e 
        container.appendChild(select)
    })
}

//3. funcion de crear una opción
const createOption = comp => {
  let option=document.createElement ("option")
  option.innerText=comp.item
  option.value =comp.id
  return option
}

//4. una función para poblar los selects
const fillSelects =list => {
    list.forEach(e=> {
        let select = document.getElementById (e.type) 
        if (!select.childElementCount) {
            let placeholder = {item: `seleccione ${e.type}` , id:""}
            select.appendChild(createOption(placeholder))
        }
        select.appendChild(createOption(e))
    })
}

//inicialización del programa
const initialize = () => {
    let compDiv = document.getElementById("itemsData")
    createSelects (compTypes, compDiv)
    fillSelects(data.prices)
    // let empDiv = document.getElementById("employee")

    // printOrders()
}