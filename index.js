const fruits = [
    {id: 1, title: 'Яблоко', price: 20, content: 'ЯблокоЯблокоЯблоко'},
    {id: 2, title: 'Апельсин', price: 30, content: 'АпельсинАпельсинАпельсин'},
    {id: 3, title: 'Манго', price: 40, content: 'МангоМангоМангоМанго'},
]

function toHTML(fruit) {
    return `<div class="card" style="width: 25rem;">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <p class="card-text">Price: ${fruit.price}$</p>
                <p class="card-text">${fruit.content}</p>
                <a href="#" class="btn btn-primary" data-btn="price" data-id='${fruit.id}'>Buy</a>
                <a href="#" class="btn btn-secondary">Erase</a>
            </div>
        </div>
    `
}

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('.card-wrap').innerHTML = html
}

render()

document.addEventListener('click', e =>{
    const btnType = e.target.dataset.btn
    const id = e.target.dataset.id - 1
    if(btnType === 'price')
    {
        e.preventDefault()
        priceModal.setContent(`<p>Price: ${fruits[id].price}$</p>`)
        priceModal.open()
    }

})


const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '800px',
    footerButtons: [
        {
            text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})
