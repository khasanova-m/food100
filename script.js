// Основа

// Основной объект с продуктами
const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcal: 400,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcal() {
            return this.kcal * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcal: 500,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcal() {
            return this.kcal * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcal: 700,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcal() {
            return this.kcal * this.amount;
        }
    }
}

// Доп. объект с начинками
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcal: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcal: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcal: 30
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    btnReceipt = document.querySelector('.receipt__window-btn');


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    // closest() - метод объекта, который подключается к родительскому элементу
    // getAttribute() - метод для получения атрибута элемента
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcal = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol');

    if (elementData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Sum;
    kcal.innerHTML = product[parentId].Kcal;
}


// ==== Fillings ====

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcal = parent.querySelector('.main__product-kcall span'),
        elAttr = element.getAttribute('data-extra');

    product[parentId][elAttr] = element.checked;

    if (product[parentId][elAttr] == true) {
        product[parentId].kcal += extraProduct[elAttr].kcal;
        product[parentId].price += extraProduct[elAttr].price;
    } else {
        product[parentId].kcal -= extraProduct[elAttr].kcal;
        product[parentId].price -= extraProduct[elAttr].price;
    }

    kcal.innerHTML = product[parentId].Kcal;
    price.innerHTML = product[parentId].Sum;
}



// ==== Чек ====

let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcal = 0;

addCart.addEventListener('click', function () {
    for (const key in product) {
        const myProd = product[key];

        if (myProd.amount > 0) {
            arrayProduct.push(myProd);

            for (const infoKey in myProd) {

                if (myProd[infoKey] === true) {
                    myProd.name += '\n' + extraProduct[infoKey].name;
                    // \n - перенос на следующую строку

                }

            }
        }

        myProd.price = myProd.Sum;
        myProd.kcal = myProd.Kcal;
    }

    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcal += el.kcal;
        totalName += '\n' + el.name + '\n';
    }

    receiptOut.innerHTML = `Вы купили: \n ${totalName} \nКалорийность: ${totalKcal}\nСтоимость покупки: ${totalPrice} сум`;

    receipt.style.display = 'flex';
    setTimeout(() => {
        receipt.style.opacity = '1';
    }, 100);
    setTimeout(() => {
        receiptWindow.style.top = '0'
    }, 100);
})


btnReceipt.addEventListener('click', function () {
    location.reload();
})


//Timer 

/* 
const headerTimer = document.querySelector('.header__timer-extra');
function timer(a, b) {
    let i = 1;
    if (headerTimer.innerHTML == 0) {
        
        headerTimer.innerHTML += i;
        return headerTimer.innerHTML;
    }else{

    }
    
    setTimeout(() => timer(), 100)
}
console.log(timer(0, 100));
 */

 /* let i = 0;
    function timer() {
        document.getElementById("timer").innerHTML = i;
        i++;
        if (i === 101) {
            return;
        } else{
            setTimeout(() => timer(), 20)
        }

    } */
    window.onload=timer;
    let i=0;
        function timer(){
            document.getElementById("timer").innerHTML=i;
            i++;
            if(i===101)
            {
                return;
            }
            if(i<=50)
            {
                setTimeout(function(){timer()},10);
            }
            else if(i<=75)
            {
                setTimeout(function(){timer()},50);
            }
            else{
                setTimeout(function(){timer()},100);
            }
        }

