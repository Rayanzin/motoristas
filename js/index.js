let dados
fetch("http://localhost:3000/posts").then(function (response) {
    response.json().then(function (data) {
        listarCarros(data)
        console.log(data);
        dados = data
    })
})
function adicionarCarro() {
    lcor.style.display = 'none'
    cor.style.display = 'none'
    lplaca.style.display = 'none'
    placa.style.display = 'none'
    overlay.classList.add("active")
    addcarros.classList.add("active")
    addcarros.classList.add("active")
}
overlay.addEventListener('click', (e => {
    overlay.classList.remove("active")
    addcarros.classList.remove("active")
    erro.classList.remove('active')
}))
function listarCarros(dados) {
    mark.innerHTML = `<option selected disabled value="selecione">Selecione</option>`
    for (let i = 0; i <= dados.marca.length - 1; i++) {
        mark.innerHTML += `<option value="${i}">${dados.marca[i].nome}</option>`
    }
}
function listarModelos() {
    lcor.style.display = 'none'
    cor.style.display = 'none'
    lplaca.style.display = 'none'
    placa.style.display = 'none'
    lmodelo.style.display = 'block'
    modelo.style.display = 'block'
    modelo.innerHTML = ""
    let car = dados.marca[mark.value].modelos
    modelo.innerHTML = `<option selected disabled value="selecione">Selecione</option>`
    for (let i = 0; i <= car.length - 1; i++) {
        modelo.innerHTML += `<option value="${i}">${car[i].nome}</option>`
    }
}
function listarDetalhes() {
    let car = dados.marca[mark.value].modelos[modelo.value]
    lcor.style.display = 'block'
    cor.style.display = 'block'
    lplaca.style.display = 'block'
    placa.style.display = 'block'
    cor.innerHTML = `<option>${car.cor}</option>`
    placa.innerHTML = `<option value="${car.placa}">${car.placa}</option>`
}
btn.addEventListener('click', (e => {
    e.preventDefault()
}))
let arrayplacas = []
function inserirCarro() {
    if (arrayplacas.indexOf(placa.value) == -1) {
        arrayplacas.push(placa.value)
        if (mark.value != 'selecione' && modelo.value != 'selecione') {
            let car = dados.marca[mark.value]
            table.innerHTML += `
                    <tr>
                        <td>${car.nome}</td>
                        <td>${car.modelos[modelo.value].nome}</td>
                        <td>${cor.value}</td>
                        <td>${placa.value}</td>
                        
                        <td>
                            <abbr title="Editar carro"><button><box-icon type='solid' name='pencil'></box-icon></button></abbr>
                            <abbr title="Excluir carro"><button id="lixo"><box-icon type='solid'
                                        name='trash'></box-icon></button></abbr>
                        </td>
                    </tr>
         `
            addcarros.classList.remove("active")
            overlay.classList.remove("active")
        }
    } else {
        erro.classList.add("active")
    }
}
function fecharTelaDeErro(){
    erro.classList.remove('active')
}