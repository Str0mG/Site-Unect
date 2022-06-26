const idTarefas = []




//requisao assync para api dos Simpsons
requestApi = () => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let div = document.getElementsByClassName('container-box-api')
            const child = document.createElement('p');
            child.innerHTML = ` " ${data[0].quote} " - ${data[0].character}`;
            div[0].appendChild(child)

            let div2 = document.getElementsByClassName('container-box-api2')
            const child2 = document.createElement('p');
            child2.innerHTML = ` " ${data[0].quote} " - ${data[0].character}`;
            div2[0].appendChild(child2)
        })
}
//abrir modal de criar card
openModal = (modalName) => {

    let modal = document.getElementById(modalName)

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'flex'

}

//close modal de criar card
closeModal = (modalName) => {

    document.getElementById('fname').style.borderColor = 'var(--bg-excluir)'

    let modal = document.getElementById(modalName)

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none'
    document.getElementById("form1").reset();

}

//criar card na primeira coluna
inserirTarefa = (title, description) => {

    const input = document.getElementById(title);
    const texto = input.value;

    const input2 = document.getElementById(description);
    const texto2 = input2.value;

    if (texto.length == 0) {
        document.getElementById('fname').style.borderColor = '#DF0000'
        return
    }

    document.getElementById('fname').style.borderColor = 'var(--bg-excluir)'

    let modal = document.getElementById('dv-modal')

    document.getElementById("form1").reset();

    modal.style.display = 'none'

    const auxId = idTarefas.length + 1
    idTarefas.push(auxId)

    document.getElementById('aato').insertAdjacentHTML("beforeend",
        `
    <div id= "${auxId}" class="box-main-body-caixa">
        <div class="box-main-body-caixa-header">
            <div id="box-main-body-caixa-header-text${auxId}" class="box-main-body-caixa-header-text">${texto}</div>
            <div class="box-main-excluir" id="box-main-excluir${auxId}">
                <button onclick="openedit('${auxId}')" class="settings" >edit_note</button>
                <button onclick="excluir('${auxId}')" id='delete_outline${auxId}' class="delete_outline">delete_outline</button>
            </div>
            <button id='dots${auxId}' class="dots" onclick="opcoes('box-main-excluir${auxId}')">more_vert</button>

        </div>
        <div class="box-main-body-caixa-footer">
            <div class="container-body-caixa-footer">
                <div class="container-body-caixa-footer-box">
                    <div id="box-main-body-caixa-footer-text${auxId}" class="inferior">Ler descrição</div>
                    <button id='expand_more${auxId}' class="expand_more"
                        onclick="aparecer('box-main-body-caixa-footer-text${auxId}')">expand_more</button>
                </div>
                <div class="box-main-body-caixa-footer-detalhes" id="minhaId${auxId}">
                <p id="texttt${auxId}" class="texttt">${texto2}</p>
                </div>
            </div>
            <div class="two" id="two${auxId}">
            <button onclick="moveteste(${auxId},'aux','1')" id='navigate_next${auxId}' class="navigate_next">navigate_next</button>
            </div>
        </div>
    </div>
        `
    )

}

clickfrase = (teste) => { }
// Aparecer descrição
aparecer = (teste) => {
    const a = teste[teste.length - 1]

    if (document.getElementById(teste).innerText == 'Ler descrição') {
        const element = document.getElementById(`minhaId${a}`);
        element.classList.add("hide");
        document.getElementById(teste).innerHTML = `Esconder descrição`;
        document.getElementById(teste).style.color = 'var(--color-hide-descricao)'
        document.getElementById(`expand_more${a}`).innerHTML = `expand_less`;
        document.getElementById(`two${a}`).style.bottom = '5px'
    }
    else {
        const element = document.getElementById(`minhaId${a}`);
        element.classList.remove("hide");
        document.getElementById(teste).innerHTML = `Ler descrição`;
        document.getElementById(teste).style.color = 'var(--color-show-descricao)'
        document.getElementById(`expand_more${a}`).innerHTML = `expand_more`;
        document.getElementById(`two${a}`).style.marginBottom = '5px'
    }
}

//desaparecer as opcoes (excluir - editar)
desaparecer = (id) => {
    const c = id[id.length - 1]

    const element = document.getElementById(id);

    element.classList.remove("hide2");
    document.getElementById(`dots${c}`).style.color = 'var(--color-show-descricao)'

    document.getElementById(`dots${c}`).onclick = function () { opcoes(id); };



}

//aparecer as opcoes (excluir - editar)
opcoes = (id) => {

    const b = id[id.length - 1]
    const element = document.getElementById(id);

    element.classList.add("hide2");

    document.getElementById(`dots${b}`).style.color = 'var(--color-btn-add)'

    document.getElementById(`dots${b}`).onclick = function () { desaparecer(id); };

}
//excluir card
excluir = (id) => {
    const card = document.getElementById(`${id}`)
    card.parentNode.removeChild(card)
}

//switch dark para light mode
dark = () => {
    let element = document.getElementById(`html`);

    element.classList.add("dark-mode");

    element = document.getElementById(`modos`);

    element.style.justifyContent = 'flex-end'

    document.getElementById(`sun`).innerHTML = `dark_mode`;

    document.getElementById(`sun`).onclick = function () { light(); };

    document.getElementById(`imgg`).src = './utils/now2.png'



}
//switch light para dark mode
light = () => {
    let element = document.getElementById(`html`);

    element.classList.remove("dark-mode");

    element = document.getElementById(`modos`);

    element.style.justifyContent = 'flex-start'

    document.getElementById(`sun`).innerHTML = `light_mode`;

    document.getElementById(`sun`).onclick = function () { dark(); };

    document.getElementById(`imgg`).src = './utils/now.png'
}
//open modal de editar
openedit = (id) => {


    const title = document.getElementById(`box-main-body-caixa-header-text${id}`).innerText

    const descricao = document.getElementById(`minhaId${id}`).innerText


    document.getElementById('fname2').value = title

    document.getElementById('lname2').innerText = descricao



    const modalName = 'edit'

    let modal = document.getElementById(modalName)

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'flex'

    document.getElementById(`clickhere2`).onclick = function () { salvar(id, 'fname2', 'lname2'); };

}
//close modal de editar
closeedit = (modalName) => {

    document.getElementById('fname').style.borderColor = 'var(--bg-excluir)'

    let modal = document.getElementById(modalName)

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none'
    document.getElementById("form1").reset();

}
//Salvar no card o edit
salvar = (id, title, desc) => {
    const input = document.getElementById(title);
    const texto = input.value;

    const input2 = document.getElementById(desc);
    const texto2 = input2.value;

    let modal = document.getElementById('edit')

    document.getElementById(`box-main-body-caixa-header-text${id}`).innerText = texto
    document.getElementById(`texttt${id}`).innerText = texto2

    modal.style.display = 'none'
}

//Mover cada card para sua respectiva coluna
moveteste = (id, from, type) => {

    document.getElementById(`box-main-body-caixa-header-text${id}`).style.textDecoration = 'none'

    if (from == 'aato') {

        document.getElementById(`navigate_before${id}`).remove()

        document.getElementById(`navigate_next${id}`).innerHTML = `navigate_next`;

        document.getElementById(`navigate_next${id}`).onclick = function () { moveteste(`${id}`, 'aux', '1'); };

        const card = document.getElementById(`${id}`)
        const andamento = document.getElementById(from)
        andamento.insertAdjacentElement('beforeend', card)

    }

    else if (from == 'aux', type) {

        if (type == '1') {
            document.getElementById(`two${id}`).insertAdjacentHTML('afterbegin', `
        <button onclick="moveteste(${id},'aato','0')" id='navigate_before${id}' class="navigate_before">navigate_before</button>
        `)
        }
        if (type == '2') {
            document.getElementById(`navigate_before${id}`).onclick = function () { moveteste(`${id}`, 'aato'); };

            document.getElementById(`navigate_next${id}`).innerHTML = `navigate_next`;
        }

        document.getElementById(`navigate_next${id}`).onclick = function () { moveteste(`${id}`, 'ehh'); };

        const card = document.getElementById(`${id}`)
        const andamento = document.getElementById(from)
        andamento.insertAdjacentElement('beforeend', card)

    }
    else {
        document.getElementById(`box-main-body-caixa-header-text${id}`).style.textDecoration = 'line-through'

        document.getElementById(`navigate_next${id}`).innerHTML = `replay`;

        document.getElementById(`navigate_next${id}`).onclick = function () { moveteste(`${id}`, 'aato', '0'); };

        document.getElementById(`navigate_before${id}`).onclick = function () { moveteste(`${id}`, 'aux', '2'); };

        const card = document.getElementById(`${id}`)
        const andamento = document.getElementById(from)
        andamento.insertAdjacentElement('beforeend', card)
    }

}
let slideIndex = 1;



window.addEventListener("load", function (event) {
    let largura = window.screen.width;
    //verifica largura
    if (largura <= 507)
        window.showSlides(slideIndex);
});

window.addEventListener('resize', function (event) {
    var altura = window.screen.height;
    var largura = window.screen.width;
    if (largura <= 507)
        showSlides(slideIndex);

    else {
        document.getElementById("dv-modal2").style.display = "none";
        let slides = document.getElementsByClassName("container-box-main");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "block";
        }
    }
});

plusSlides = (n) => {
    showSlides(slideIndex += n);
}

currentSlide = (n) => {
    showSlides(slideIndex = n);
}

//slides
showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("container-box-main");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}