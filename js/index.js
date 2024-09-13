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
    removerTodosModais()
}))
btncars.addEventListener('click', e => {
    removerTodosModais()
})
btndriver.addEventListener('click', e => {
    removerTodosModais()
})
function removerTodosModais() {
    overlay.classList.remove("active")
    addcarros.classList.remove("active")
    erro.classList.remove('active')
    confirmarcarro.classList.remove("active")
    confirmarmotorista.classList.remove("active")
    edicao.classList.remove("active")
    addmotorista.classList.remove("active")
    preencher.classList.remove("active")
    errodecnh.classList.remove('active')
    atrelamento.classList.remove("active")
    mincaracteres.classList.remove("active")
    visualizar.classList.remove("active")
    errodeatrelamento.classList.remove("active")
    selecionarcarro.classList.remove("active")
    paragrafo.innerHTML = ``
}
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
                    <tr class="even">
                        <td>${car.nome}</td>
                        <td>${car.modelos[modelo.value].nome}</td>
                        <td class="cor" value="${cor.value}">${cor.value}</td>
                        <td>${placa.value}</td>
                        
                        <td>
                            <abbr title="Editar carro"><button onclick="editarCarro(this)"><box-icon type='solid' name='pencil'></box-icon></button></abbr>
                            <abbr title="Excluir carro"><button value="${placa.value}" class="lixo" onclick="desejaExcluir(this)" ><box-icon type='solid'
                                        name='trash'></box-icon></button></abbr>
                        </td>
                    </tr>
         `
            addcarros.classList.remove("active")
            overlay.classList.remove("active")
            arraycarros.push(
                {
                    modelo: `${car.modelos[modelo.value].nome}`,
                    marca: `${car.nome}`,
                    cor: `${cor.value}`,
                    placa: `${placa.value}`
                }
            )
        }
    } else {
        erro.classList.add("active")
    }
}
function fecharTelaDeErro() {
    erro.classList.remove('active')
    errodecnh.classList.remove('active')
    preencher.classList.remove("active")
    selecionarcarro.classList.remove("active")
    mincaracteres.classList.remove("active")
    errodeatrelamento.classList.remove("active")
}
let lixeira
let rowcnh
let positioncar
function desejaExcluir(tr, pos) {
    positioncar = pos
    lixeira = tr
    let row = tr.closest("tr")
    rowcnh = row.querySelector('.cnhhidden button')
    if(tr.parentElement == table){
        confirmarcarro.classList.add("active")
    }else{
        confirmarmotorista.classList.add("active")
    }
    overlay.classList.add("active")
}
function fecharConfirmarExcluir() {
    confirmarcarro.classList.remove("active")
    confirmarmotorista.classList.remove("active")
    overlay.classList.remove("active")
}
function excluirCarro() {
    atualizarPosicoes()
    let abbr = lixeira.parentElement
    let td = abbr.parentElement
    td.parentElement.remove()
    confirmarcarro.classList.remove("active")
    overlay.classList.remove("active")
    arrayplacas.splice(placa.value, 1)
}
function excluirMotorista(){
    atualizarPosicoes()
    let abbr = lixeira.parentElement
    let td = abbr.parentElement
    td.parentElement.remove()
    confirmarmotorista.classList.remove("active")
    overlay.classList.remove("active")
    let cnhremove = cnhs.indexOf(rowcnh.value)
    cnhs.splice(cnhremove, 1)
    carroatrelado.splice(carrosadicionados.value, 1)
    arraymotoristas.splice(positioncar,1)
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
function validateInput(input) {
    // Remove qualquer caractere que não seja número
    input.value = input.value.replace(/[^0-9]/g, '');
}
function validateLetters(input) {
    // Remove qualquer caractere que não seja letra
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
}
let cnhs = []
let arraymotoristas = []
btninsertdriver.addEventListener('click', e => {
    e.preventDefault()
})
function inserirMotorista() {
    if (driver.value.length > 3 && cnh.value.length == 10) {
        atualizarPosicoes()
        if (cnhs.indexOf(cnh.value) == -1) {
            cnhs.push(cnh.value)
            motoristas.innerHTML += `
            <tr>
            <td class="cnhhidden" hidden><button  value="${cnh.value}"></button></td>
            <td class="nomedomotorista">${driver.value}</td>
            <td class="estado">livre</td>
            <td>
            <abbr title="Detalhes"><button class="eye" onclick="visualizarCarro(this,${rowdriver})"><box-icon name='show-alt'></box-icon></button></abbr>
            <abbr title="Atrelar Carro"><button class="poscarro" onclick="atrelarCarro(this, ${rowdriver})"><box-icon type='solid' name='car'></box-icon></button></abbr>
            <abbr title="Excluir Motorista"><button class="lixo" value="${cnh.value}" onclick="desejaExcluir(this, ${rowdriver})" ><box-icon type='solid'
            name='trash'></box-icon></button></abbr>
            </td>
            </tr>
            `
            addmotorista.classList.remove("active")
            overlay.classList.remove("active")
            arraymotoristas.push(
                {
                    nome: `${driver.value}`,
                    estado: "livre",
                    carro: ``,
                    cnh: `${cnh.value}`
                }
            )
            console.log(rowdriver);
            console.log(arraymotoristas);
        } else {
            errodecnh.classList.add("active")
            console.log(cnhs);
            
        }
    } else {
        mincaracteres.classList.add("active")
    }
}
let condutor
let atrelarcarro
let posscarro = ''
function atrelarCarro(button, pos) {
    posscarro = pos
    row = button.closest('tr')
    condutor = row.querySelector('.nomedomotorista')
    atrelarcarro = row.querySelectorAll('.poscarro')
    paragrafo.innerHTML = ``
    paragrafo.innerHTML += `Selecione um carro para atrelar à ${condutor.innerText}`
    overlay.classList.add("active")
    atrelamento.classList.add("active")
    carrosadicionados.innerHTML = `<option value="selecionar" selected disabled>Selecionar</option>`
    arraycarros.map(array => {
        carrosadicionados.innerHTML += `
        <option value="${array.modelo}">${array.modelo}</option>
        `
    })
}
let carroatrelado = []
let carroatual;
let rowdriver = -1
function atualizarPosicoes() {
    const linhas = document.querySelectorAll('#motoristas tr');
    linhas.forEach((linha, index) => {
        return rowdriver = index
    });
}

function restringirCarro() {
    carroatual = carrosadicionados.value
}
function atrelar() {
    if (carrosadicionados.value != 'selecionar') {
        if (carroatrelado.indexOf(carroatual) == -1) {
            let carroAnterior = arraymotoristas[posscarro].carro;
            if (carroatrelado.indexOf(carroAnterior) != -1) {
                let indiceCarroAnterior = carroatrelado.indexOf(carroAnterior);
                carroatrelado.splice(indiceCarroAnterior, 1);
            }
            carroatrelado.push(carroatual);
            arraymotoristas[posscarro].carro = carroatual;
            atrelamento.classList.remove("active");
            overlay.classList.remove("active");
            estado = row.querySelector('.estado');
            estado.innerHTML = `Ocupado`;
        } else {
            errodeatrelamento.classList.add("active")
        }
    } else {
        selecionarcarro.classList.add("active")
    }
}
function visualizarCarro(tr, posicaocarro) {
    let row = tr.closest("tr")
    rowcnh = row.querySelector('.cnhhidden button')
    overlay.classList.add("active")
    visualizar.classList.add("active")
    dadoscarro.innerHTML = ''
    dadoscarro.innerHTML += `
        <p><strong>Carro:</strong> ${arraymotoristas[posicaocarro].carro}</p>
        <p><strong>Cnh:</strong> ${rowcnh.value}</p>
    `
}