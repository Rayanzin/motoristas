let dados
fetch("http://localhost:3000/posts").then(function (response) {
    response.json().then(function (data) {
        listarCarros(data)
        console.log(data);

        dados = data
    })
})
function adicionarCarro() {
    overlay.classList.add("active")
    addcarros.classList.add("active")
}
overlay.addEventListener('click', (e => {
    overlay.classList.remove("active")
    addcarros.classList.remove("active")
}))
function listarCarros(dados) {
     mark.innerHTML = `<option selected disabled>Selecione</option>`
    for (let i = 0; i <= dados.marca.length - 1; i++) {
        mark.innerHTML += `<option value="${i}">${dados.marca[i].nome}</option>`
    }
}
function listarModelos() {
    let car = dados.marca[mark.value].modelos
    lmodelo.style.display = 'block'
    modelo.style.display = 'block'
    modelo.innerHTML = ""
    modelo.innerHTML = `<option selected disabled>Selecione</option>`
    for (let i = 0; i <= car.length; i++) {
        modelo.innerHTML += `<option value="${car[i].nome}">${car[i].nome}</option>`
    }
}
