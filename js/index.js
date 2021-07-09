const form = document.querySelector(".form")
const button = document.querySelector(".button")
const cantidadDeIntegrantes = document.querySelector("#cantidadDeIntegrantes")
const title = document.querySelector(".title")
const grandFather = document.querySelector(".grandFather")
button.value = "Siguiete"

document.addEventListener("click", (e) =>{
    e.preventDefault()
    clickButtonSiguiente(e)
    clickButtonCalcular(e, ".button_calcular")
})

const clickButtonSiguiente = (e) => {
    if(e.target === button){
        crearInputsyLabelSegunCantidadIntegrantes()
    }
}

const clickButtonCalcular = (e, selector) =>{
    if(e.target.matches(selector)){
        refrescarCantidadintegrantes()
        imprimirMenorEdad()
        inprimirMayorEdad()
        imprimirPromedioEdades()
    }
}

const realizarInputYLabel = (num) => {
        const newTitle = document.createElement("label")
        newTitle.textContent = `integrante ${num}`
        newTitle.classList.add("new_label")

        const newInput = document.createElement("input")
        newInput.setAttribute("type", "number")
        newInput.classList.add("new_input")

        const container = document.createElement("div")
        container.classList.add("container")

        container.appendChild(newTitle)
        container.appendChild(newInput)
        grandFather.appendChild(container)
    
}
const newButton = () => {
    const buttonCalcular = document.createElement("input")
    buttonCalcular.setAttribute("type", "submit")
    buttonCalcular.value = "Calcular"
    buttonCalcular.classList.add("button_calcular")
    grandFather.appendChild(buttonCalcular)
}

const crearInputsyLabelSegunCantidadIntegrantes = () => {
    const totalIntegrantes = Number(cantidadDeIntegrantes.value)
    let numero = 0

    if(totalIntegrantes === 0){
        cantidadDeIntegrantes.value = ""
        mensajeEnCasoDeNumeroCero()
        eliminarMensajeDeError()
    }else{
        borrar()
        newButton()
    }
    for(let i = 0; i < totalIntegrantes; i++){
        numero++
        realizarInputYLabel(numero)
    }
      
}

const refrescarCantidadintegrantes = () => {
    const numeroIntegrantes = Number(cantidadDeIntegrantes.value)
    if(numeroIntegrantes > 0){
        cantidadDeIntegrantes.value = ""
    }
}

const mensajeEnCasoDeNumeroCero = () => {
    const messageRed = document.createElement("h3")
    messageRed.textContent = "Debe haber al menos un integrante"
    messageRed.classList.add("red_message")
    grandFather.appendChild(messageRed)
}
const eliminarMensajeDeError = () => {
    setTimeout(() => {
        document.querySelector(".red_message").remove()
    },1500)
}

const borrar = () => {  
    document.querySelectorAll(".container").forEach(el =>{
        el.remove()
    })
    grandFather.removeChild(grandFather.firstChild)
    document.querySelectorAll(".grandFather h2").forEach(el => {
        el.remove()
    })
}


const crearArrayValueInputs = () => {
    const valoresInputs = document.querySelectorAll(".new_input")
    const arrayValueInputs = []
    for(let numero of valoresInputs){
        numero = Number(numero.value)
        arrayValueInputs.push(numero)
    }
    return arrayValueInputs
}

const buscarEdadMenorYEdadMayorEnArray = (array) => {
    let numeroMenor = 10000
    let numeroMayor = 0
    const edadesIntegrantes = crearArrayValueInputs(array)
    for(let edad of edadesIntegrantes){
        if(edad < numeroMenor){
            numeroMenor = edad
        }
        if(edad > numeroMayor){
            numeroMayor = edad
        }
    }
    
    return {numeroMenor, numeroMayor}
}

const buscarPosicionesCoincidentesDeArrayEdades = (array) => {
    const edadesIntegrantes = crearArrayValueInputs(array)
    const {numeroMayor} = buscarEdadMenorYEdadMayorEnArray()
    const {numeroMenor} = buscarEdadMenorYEdadMayorEnArray()

    let arrayMayorEdad = []
    let arrayMenorEdad = []
    const mayorEdad = numeroMayor
    const menorEdad = numeroMenor

    for(i = 0; i < edadesIntegrantes.length; i++){
        if(edadesIntegrantes[i] === menorEdad){
            arrayMenorEdad.push(i)
        }if(edadesIntegrantes[i] === mayorEdad){
            arrayMayorEdad.push(i)
        }
    }

    return {arrayMenorEdad, arrayMayorEdad}
}

const calcularPromedioDeEdades = (array) => {
    const edadesIntegrantes = crearArrayValueInputs(array)
    let promedio = 0
    for(numero of edadesIntegrantes){
        promedio += numero
    }
    promedio /= edadesIntegrantes.length
    return promedio = Number(promedio.toFixed(2))
}

const toCreateTitle = () => {
    const title = document.createElement("h2")
    grandFather.appendChild(title)
    return {title}
}

const imprimirMenorEdad = () => { 
    const {arrayMenorEdad} = buscarPosicionesCoincidentesDeArrayEdades()
    const {numeroMenor} = buscarEdadMenorYEdadMayorEnArray()
    arrayMenorEdad.forEach(posicion =>{
        const {title} = toCreateTitle()
        title.textContent = `El integrante ${posicion + 1} es el de menor de edad y tiene ${numeroMenor} años`
    })
}

const inprimirMayorEdad = () => {
    const {arrayMayorEdad} = buscarPosicionesCoincidentesDeArrayEdades()
    const {numeroMayor} = buscarEdadMenorYEdadMayorEnArray()
    arrayMayorEdad.forEach(posicion =>{ 
        const {title} = toCreateTitle()
        title.textContent = `El integrante ${posicion + 1} es el de mayor de edad y tiene ${numeroMayor} años`
    })
}

const imprimirPromedioEdades = (promedio) => {
    const {title} = toCreateTitle()
    title.textContent = `El promedio de edades es de ${calcularPromedioDeEdades(promedio)} años`
}


