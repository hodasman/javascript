'use strict';

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  document.querySelector('.basket').classList.toggle('hidden');
});

/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это товар в корзине - объект, содержащий
 * id, название товара, цену, и количество штук, например:
 * {
 *    1: {id: 1, name: "product 1", price: 30, count: 2},
 *    3: {id: 3, name: "product 3", price: 25, count: 1},
 * }
 */
const basket = {};

function addToCard(obj, el) {
  const id = el.dataset.id;
  const name = el.dataset.name;
  const price = el.dataset.price;
  let totalValue = 0;
  let totalCount = 0;
  (id in obj) // тернарный оператор который проверяет наличие товара в корзине 
  ? (obj[id].count++) // если товар уже есть в корзине увеличиваем значение count
  : (obj[id] = {'id': id, 'name': name, 'price': price, 'count': 1});
  // если нет добавляем элемент в объект
  
  document.querySelectorAll('.basketRow.added ').forEach(el => {
    el.remove() // удаляем все добавленные ряды в предыдущем вызове функции
  })
  Object.values(obj).forEach(product => {  // проходимся по значениям свойств объекта basket
    const basketRow = ` 
      <div class="basketRow added"> 
        <div>${product.name}</div>
        <div>${obj[product.id].count}</div>
        <div>${product.price}</div>
        <div>$${obj[product.id].count * +product.price.replace('$', '')}</div>
      </div>
    `;// всем добавляемым строкам прописываем дополнительный класс added
    totalValue = totalValue + obj[product.id].count * +product.price.replace('$', '');
    totalCount = totalCount + obj[product.id].count;
    document.querySelector('.basketHeader').insertAdjacentHTML('afterend', basketRow);
    // добавляем заготовленный html в нужное место
    document.querySelector('.basketTotalValue').textContent = totalValue;
    // считаем и добавляем общую стоимость товаров
    document.querySelector('.cartIconWrap span').textContent = totalCount;
    // считаем и добавляем количество товаров в корзине
  })
    
  
}

document.querySelector('.featuredItems').addEventListener('click', e => { 
  if (!e.target.closest('.addToCard')) {
    return;
  }
  addToCard(basket, e.target.closest('.featuredItem')); 
  
});
 


