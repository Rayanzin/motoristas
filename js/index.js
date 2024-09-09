let dados
fetch("http://localhost:3000/users").then(function (response) {
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
    confirmar.classList.remove("active")
    edicao.classList.remove("active")
    addmotorista.classList.remove("active")
    preencher.classList.remove("active")
    errodecnh.classList.remove('active')
    atrelamento.classList.remove("active")
    paragrafo.innerHTML = ``
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
    cor.innerHTML = ``
    mudarcor.innerHTML = ``
    for (let i = 0; i <= car.cores.length - 1; i++) {
        cor.innerHTML += `<option>${car.cores[i].cor}</option>`
        mudarcor.innerHTML += `<option>${car.cores[i].cor}</option>`
    }
    lcor.style.display = 'block'
    cor.style.display = 'block'
    lplaca.style.display = 'block'
    placa.style.display = 'block'
    placa.innerHTML = `<option value="${car.placa}">${car.placa}</option>`
}
btn.addEventListener('click', (e => {
    e.preventDefault()
}))
let arrayplacas = []
let arraycarros = []
function inserirCarro() {
    if (arrayplacas.indexOf(placa.value) == -1) {
        if (mark.value != 'selecione' && modelo.value != 'selecione') {
            arrayplacas.push(placa.value)
            let car = dados.marca[mark.value]
            table.innerHTML += `
                    <tr>
                        <td value="${car.nome}">${car.nome}</td>
                        <td value="${car.modelos[modelo.value].nome}">${car.modelos[modelo.value].nome}</td>
                        <td class="cor" value="${cor.value}">${cor.value}</td>
                        <td value="${placa.value}">${placa.value}</td>
                        
                        <td>
                            <abbr title="Editar carro"><button onclick="editarCarro(this)"><box-icon type='solid' name='pencil'></box-icon></button></abbr>
                            <abbr title="Excluir carro"><button value="${placa.value}" class="lixo" onclick="desejaExcluir(this)" ><box-icon type='solid'
                                        name='trash'></box-icon></button></abbr>
                        </td>
                    </tr>
         `
            addcarros.classList.remove("active")
            overlay.classList.remove("active")
            arraycarros.push()
        }
    } else {
        erro.classList.add("active")
    }
}
function fecharTelaDeErro() {
    erro.classList.remove('active')
    errodecnh.classList.remove('active')
    errodecnh.classList.remove('active')
    preencher.classList.remove("active")
}
let lixeira
function desejaExcluir(tr) {
    lixeira = tr
    confirmar.classList.add("active")
    overlay.classList.add("active")
}
function fecharConfirmarExcluir() {
    confirmar.classList.remove("active")
    overlay.classList.remove("active")
}
function excluirCarro() {
    let abbr = lixeira.parentElement
    let td = abbr.parentElement
    td.parentElement.remove()
    confirmar.classList.remove("active")
    overlay.classList.remove("active")
    arrayplacas.splice(placa.value, 1)
    cnhs.splice(placa.value, 1)
    
}
let corSelecionada
function editarCarro(button) {
    row = button.closest('tr')
    corSelecionada = row.querySelector('.cor')
    overlay.classList.add("active")
    edicao.classList.add("active")
}
function editarCor() {
    corSelecionada.innerHTML = changeCor()
    overlay.classList.remove("active")
    edicao.classList.remove("active")
}
function changeCor() {
    return mudarcor.value
}
function adicionarMotorista() {
    addmotorista.classList.add("active")
    overlay.classList.add("active")
}
function tableCars() {
    tabeladecarros.style.display = 'block'
    motorista.style.display = 'none'
}
function tableDrivers() {
    tabeladecarros.style.display = 'none'
    motorista.style.display = 'block'
}

cnh.addEventListener('keyup', (e => {
    let carteira = e.target.value.slice(0, 10)
    e.target.value = carteira
}))
let cnhs = []
function inserirMotorista() {
    console.log(cnhs);
    
    if (cnhs.indexOf(cnh.value) == -1) {
        if (driver.value != '' && cnh.value != '') {
            cnhs.push(cnh.value)
            motoristas.innerHTML += `
                        <tr>
                            <td class="nomedomotorista" value="${driver.value}">${driver.value}</td>
                            <td class="estado">livre</td>
                            <td>
                                <abbr title="Detalhes"><button class="eye"><box-icon name='show-alt'></box-icon></button></abbr>
                                <abbr title="Editar carro"><button onclick="atrelarCarro(this)"><box-icon type='solid' name='car'></box-icon></button></abbr>
                                <abbr title="Excluir carro"><button class="lixo" value="${cnh.value}" onclick="desejaExcluir(this)" ><box-icon type='solid'
                                            name='trash'></box-icon></button></abbr>
                            </td>
                        </tr>
        `
            addmotorista.classList.remove("active")
            overlay.classList.remove("active")
        } else {
            preencher.classList.add("active")
        }
    }else{
        errodecnh.classList.add("active")
    }
}
let condutor
function atrelarCarro(button){
    row = button.closest('tr')
    condutor = row.querySelector('.nomedomotorista')
    paragrafo.innerHTML += `Selecione um carro para atrelar à ${condutor.innerText}`
    overlay.classList.add("active")
    atrelamento.classList.add("active")
    carrosadicionados.innerHTML = `<option value="selecionar" selected disabled>Selecionar</option>`
    carrosadicionados.innerHTML += `<option></option>`
}