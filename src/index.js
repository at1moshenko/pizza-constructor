import "./index.css";
import images1 from "../img/1.png";
import images2 from "../img/2.png";
import images3 from "../img/3.png";
import images4 from "../img/4.png";
import {
  base,
  sauce,
  ingredientOne,
  ingredientTwo,
  orderList,
  priceElement,
  selectedItems,
  btn,
} from "./const/const";

import {
  arrayBase,
  arraySauce,
  arrayIngredientOne,
  arrayIngredientTwo,
} from "./array/array";

// ===============================================
// ===============================================
let totalPrice = 0;
btn.disabled = true;
// ===============================================
// ===============================================

orderList.addEventListener("click", (event) => {
  const itemIndex = selectedItems.findIndex(
    (item) => item.name === event.target.textContent
  );

  if (itemIndex !== -1) {
    removeItem(selectedItems[itemIndex]);
    updateOrder();
    updateImage();
  }
});

// ===============================================
// ===============================================

btn.addEventListener("click", () => {
  const obj = selectedItems.reduce((acc, cur, i) => {
    acc[i] = cur;
    return acc;
  }, {});

  console.log(obj);
  alert("Ваш заказ успешно оформлен!");
  location.reload();
});

// ===============================================
// ===============================================

function addingText(arr, constQuerytSelector) {
  arr.forEach((item, index) => {
    constQuerytSelector[index].textContent = item.name;
  });
}

addingText(arrayBase, base);
addingText(arraySauce, sauce);
addingText(arrayIngredientOne, ingredientOne);
addingText(arrayIngredientTwo, ingredientTwo);

// ===============================================
// ===============================================

function updateOrder() {
  orderList.innerHTML = "";
  totalPrice = 0;
  selectedItems.forEach((item) => {
    const listItem = document.createElement("p");
    listItem.classList = "style";
    listItem.textContent = item.name;
    orderList.innerHTML += listItem.outerHTML;
    totalPrice += item.price;
  });
  priceElement.textContent = totalPrice;
}

// ===============================================
// ===============================================

function addImage(imageNumber, imageArray, divImg) {
  const img = document.createElement("img");
  img.src = imageArray[imageNumber];
  divImg.innerHTML = "";
  divImg.append(img);
}

// ===============================================
// ===============================================

function checkSelection() {
  const hasBase = arrayBase.some((item) => selectedItems.includes(item));

  const hasSauce = arraySauce.some((item) => selectedItems.includes(item));

  const hasIngredientOne = arrayIngredientOne.filter((item) =>
    selectedItems.includes(item)
  ).length;

  const hasIngredientTwo = arrayIngredientTwo.filter((item) =>
    selectedItems.includes(item)
  ).length;

  const hasIngredients = hasIngredientOne && hasIngredientTwo;

  if (hasBase && hasSauce && (hasIngredientOne >= 1 || hasIngredientTwo >= 1)) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }

  btn.disabled =
    !(hasBase && hasSauce && hasIngredients) || selectedItems.length === 0;
}

// ===============================================
// ===============================================

function updateImage() {
  const divImg = document.getElementById("img");
  switch (selectedItems.length) {
    case 0:
      divImg.innerHTML = "";
      break;
    case 1:
      addImage(0, [images1], divImg);
      break;
    case 2:
      addImage(0, [images2], divImg);
      break;
    case 3:
      addImage(0, [images3], divImg);
      break;
    case 4:
      addImage(0, [images4], divImg);
      break;
    default:
      break;
  }
}

// ===============================================
// ===============================================

function addToOrder(item) {
  const createCheckIngredient = (ingredientArray) => {
    return (selectedItem) => {
      return ingredientArray.some(
        (ingredient) => ingredient.name === selectedItem.name
      );
    };
  };

  const isAlreadyInArray = selectedItems.some(
    (selectedItem) => selectedItem.name === item.name
  );
  const ingredientSets = [
    { name: "Ingredient One", array: arrayIngredientOne, maxCount: 2 },
    { name: "Ingredient Two", array: arrayIngredientTwo, maxCount: 2 },
    { name: "Base", array: arrayBase, maxCount: 1 },
    { name: "Sauce", array: arraySauce, maxCount: 1 },
  ];

  if (
    !isAlreadyInArray &&
    ingredientSets.every((el) => {
      const checkIngredient = createCheckIngredient(el.array);
      const isIngredient = checkIngredient(item);
      const count = selectedItems.filter(checkIngredient).length;
      return !isIngredient || count < el.maxCount;
    })
  ) {
    selectedItems.push(item);
    updateOrder();
    updateImage();
    checkSelection();
  }
}

// ===============================================
// ===============================================

function clickEvent(arr, constQuerytSelector) {
  constQuerytSelector.forEach((paragraph, index) => {
    paragraph.addEventListener("click", () => {
      addToOrder(arr[index]);
      checkSelection();
    });
  });
}

clickEvent(arrayBase, base);
clickEvent(arraySauce, sauce);
clickEvent(arrayIngredientOne, ingredientOne);
clickEvent(arrayIngredientTwo, ingredientTwo);

// ===============================================
// ===============================================

function removeItem(item) {
  const index = selectedItems.indexOf(item);
  if (index > -1) {
    selectedItems.splice(index, 1);
    checkSelection();
  }
}

// ===============================================
// ===============================================
