// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); // минимальный вес для фильтрации
const maxWeight = document.querySelector('.maxweight__input'); // максимальный вес для фильтрации
const panelSelector = document.querySelector('.panel__wrapper'); // зона отображения карточек

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`,
// преобразование JSON в объект JavaScript
    fruits = JSON.parse(fruitsJSON),
// десериализация в дополнительный объект
    fruits1 = JSON.parse(JSON.stringify(fruits));  
/*** ОТОБРАЖЕНИЕ ***/
// создание карточек фруктов
class fruitCard {
  constructor(indexFruit, parentSelector, {kind, color, weight}) {
    this.indexFruit = indexFruit;
    this.kindName = kind;
    this.colorFruit = color;
    this.weightFruit = weight;
    this.parent = document.querySelector(parentSelector);
  }
 // рамка карточки в зависимости от цвета
  colorTranslate(color) {
    switch (color) {
      case 'фиолетовый' : return 'fruit_violet';
      case 'зеленый' : return 'fruit_green';
      case 'розово-красный' : return 'fruit_carmazin';
      case 'желтый' : return 'fruit_yellow';
      case 'светло-коричневый' : return 'fruit_lightbrown';
    }
  }
  render() {
    const element = document.createElement('li');
    element.classList.add('fruit__item');
    element.classList.add(this.colorTranslate(this.colorFruit));
    element.innerHTML = `
        <div class="fruit__info">
          <div>index: ${this.indexFruit}</div>
          <div>kind: ${this.kindName}</div>
          <div>color: ${this.colorFruit}</div>
          <div>weight (кг): ${this.weightFruit}</div>
        </div>
    `;
    this.parent.appendChild(element);
  }
}
// отрисовка карточек
const display = (arr) => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';
  arr.forEach((element, key) => {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    new fruitCard(key, '.fruits__list', element).render(); 
  });
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let i = getRandomInt(0, fruits.length - 1);
    result.push(fruits[i]);
    fruits.splice(i, 1);
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = (minimalWeight, maximumWeight) => { 
  return fruits.filter((item) => {
      // TODO: допишите функцию
      return (item.weight >= minimalWeight && item.weight <= maximumWeight);
  });
};

filterButton.addEventListener('click', () => {
  const minimalWeight = minWeight.value != '' ? parseInt(minWeight.value) : 0,
        maximumWeight = maxWeight.value != '' ? parseInt(maxWeight.value) : 100;
        if (minWeight.value != '' || maxWeight.value != '') {
    fruits = filterFruits(minimalWeight, maximumWeight);
  }
  display(fruits);
});

/*** СОРТИРОВКА ***/

const priority  = ["розово-красный", "светло-коричневый", "желтый", "зеленый", "фиолетовый"];

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return priority.indexOf(a.color) > priority.indexOf(b.color) ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    for (let i = 1, l = arr.length; i < l; i++) {
      const current = arr[i];
      let j = i;
      while (j > 0 && (comparation(arr[j - 1], current))) {
          arr[j] = arr[j - 1];
          j--;
      }
      arr[j] = current;
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  }
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  //const sort = sortAPI[sortKind];
  //sortAPI.startSort(sort, fruits, comparationColor);
  const start = new Date().getTime();
  if (sortKind === 'bubbleSort') {
    sortAPI.bubbleSort(fruits, comparationColor);
  }
  const end = new Date().getTime();
  sortTime = `${end - start} ms`;
  display(fruits);
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
    // TODO: создание и добавление нового фрукта в массив fruits
    // необходимые значения берем из kindInput, colorInput, weightInput
    let newKind, newColor, newWeight;
    if (kindInput.value !='' && colorInput.value !='' && weightInput.value !='') {
      newKind = kindInput.value.toLowerCase();
      newKind = newKind.replace(newKind[0], newKind[0].toUpperCase());
      newColor = colorInput.value.toLowerCase(); 
      newWeight = parseInt(weightInput.value);
      // преобразовываем в объект и вставляем в массив
      fruits1.push(JSON.parse(`{"kind": "${newKind}", "color": "${newColor}", "weight": ${newWeight}}`)); 
      fruits = JSON.parse(JSON.stringify(fruits1));
      display(fruits);
    } 
  });