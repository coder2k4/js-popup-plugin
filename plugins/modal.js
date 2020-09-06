/**
 * Добавляем всем элементам метод - вставить после элемента
 * @param element - после какого элемента будем вставлять наш
 */
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}




/**
 * Функция для динамического создания footer и кнопок в модальном окне
 * @param buttons - массив заранее приготовленных кнопок
 * @returns {HTMLDivElement} - возвращаем html элемент
 * @private
 */
function _createModelFooter(buttons = []) {
    if (buttons.length === 0) return document.createElement('div')

    const footer = document.createElement('div')
    footer.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || function(){}
        footer.appendChild($btn)
    })

    return footer
}


function _createModal(options) {
    const modal = document.createElement('div')
    const defaultWidth = '400px'

    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `           
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || defaultWidth}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Popup'}</span>                     
                     ${options.closable ? '<span class="modal-close" data-close="true">&times;</span>': ''}                       
                </div>
                <div class="modal-body">
                    ${options.content}
                </div>                
            </div>
        </div>        
    `)

    //Создаем футер с кнопками
    const footer = _createModelFooter(options.footerButtons)
    //Вызываем кастомный метод и добавляем футер после modal-body
    footer.appendAfter(modal.querySelector('.modal-body'))

    document.body.appendChild(modal)
    return modal
}


$.modal = function (options) {

    //Создаем HTML ноду с нашим модальным окном
    const $modal = _createModal(options)

    const animationSPEED = 500
    let hiding = false  //Запрещаем в момент скрывания окна открыть его
    let destroyed = false //Запрещаем выполнять открытие/закрытие, если модалка уничтожена

    //Возвращаем общект с функциями для замыкания.
    const modal = {
        open() {
            if (!hiding && !destroyed)
                $modal.classList.add('open')
        },
        close() {
            if(destroyed) return
            hiding = true
            $modal.classList.remove('open')
            $modal.classList.add('hiding')
            setTimeout(() => {
                $modal.classList.remove('hiding')
                hiding = false
            }, animationSPEED)
        },
        onClose(){}
    }

    const listener = (e) => {
        if (e.target.dataset.close === 'true')
            modal.close()
    }

    $modal.addEventListener('click', listener)


    return Object.assign(modal, {
        destroy() {
            destroyed = true
            //Отключаем все послушки
            $modal.removeEventListener('click', listener)

            //Удаляем DOM из HTML
            $modal.parentNode.removeChild($modal);
        },
        setContent(html){
            $modal.querySelector('.modal-body').innerHTML = html
        }
    })
}