const data = [
    {
        id: 1,
        numOrder: 1,
        location: "Vietnamese",
        name: "Pho Ga",
        image: "./assets/images/pho-vietnam.png",
        comment: {
            rate: 4.9,
            color: "#ffa467",
            name: "Tuan Nguyen",
            id: "@tuan.utib",
            content: "Lorem ipsum dolor sit amet dicta consectetur adipisicing elit dicta. Voluptates laborum voluptatum enim dicta laboriosam quia.",
            like: 99,
            dislike: 0
        }
    },
    {
        id: 2,
        numOrder: 2,
        location: "Vietnamese",
        name: "Ca Kho",
        image: "./assets/images/food-1.png",
        comment: {
            rate: 4.8,
            color: "#f3b9d4",
            name: "Nguyen Tuan",
            id: "@tuan.utib.edu",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur in, neque facilis ad accusamus.",
            like: 99,
            dislike: 0
        }
    },
    {
        id: 3,
        numOrder: 3,
        location: "Vietnamese",
        name: "Salad",
        image: "./assets/images/food-2.png",
        comment: {
            rate: 4.7,
            color: "#bacc9f",
            name: "Tuan Nguyen",
            id: "@tuan.utib",
            content: "Lorem ipsum dolor sit amet dicta consectetur adipisicing elit dicta. Voluptates laborum voluptatum enim dicta laboriosam quia.",
            like: 99,
            dislike: 0
        }
    },
    {
        id: 4,
        numOrder: 4,
        location: "Italian",
        name: "Spaghetti",
        image: "./assets/images/food-3.png",
        comment: {
            rate: 4.6,
            color: "#fecf58",
            name: "Nguyen Tuan",
            id: "@tuan.utib.edu",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur in, neque facilis ad accusamus.",
            like: 99,
            dislike: 0
        }
    }
];

let itemSelected = {
    id: 1,
    numOrder: 1,
    location: "Vietnamese",
    name: "Pho Ga",
    image: "./assets/images/pho-vietnam.png",
    comment: {
        rate: 4.9,
        color: "#ffa467",
        name: "Tuan Nguyen",
        id: "@tuan.utib",
        content: "Lorem ipsum dolor sit amet dicta consectetur adipisicing elit dicta. Voluptates laborum voluptatum enim dicta laboriosam quia.",
        like: 99,
        dislike: 0
    }
};

var utScrollReveal = function () {
    window.sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2500,
        delay: 400,
        reset: false
    })

    sr.reveal(`.scroll-reveal-delay`, { delay: 400 });
    sr.reveal(".scroll-reveal-top-down", { delay: 300 });
    sr.reveal(`.scroll-reveal-center`, { delay: 400, origin: 'center' });
    sr.reveal(`.scroll-reveal-bottom-up`, { delay: 400, origin: 'bottom' });
    sr.reveal(`.scroll-reveal-left-right`, { delay: 300, origin: 'left' });
    sr.reveal(`.scroll-reveal-right-left`, { delay: 400, origin: 'right' });
}

const genListProduct = function () {
    const listArea = document.getElementById("list-product");
    let content = `<div type="prv" class="action left-action flex-row-auto">
            <i class='bx bxs-chevron-left'></i>
        </div>`;
    data.forEach((e, i) => {
        const isActive = e.id == itemSelected.id ? 'item-active' : '';
        const item = `<div item-id="${e.id}" class="product-item item ${isActive} flex-row-fluid d-flex justify-content-center align-items-center flex-column">
            <div class="item-content d-flex flex-column justify-content-center align-items-center">
                <img src="${e.image}" alt="">
                <div class="name">${e.location} <br />${e.name}</div>
            </div>
            <div class="${i == 0 ? 'item-shadow item-shadow-' + itemSelected.id : ''}">
            </div>
        </div>`;
        content += item;
    });
    content += `<div type="next" class="action right-action flex-row-auto d-flex justify-content-end align-items-end">
            <i class='bx bxs-chevron-right'></i>
        </div>`;

    listArea.innerHTML = content;
    registerClickEvent();
}


const registerClickEvent = function () {
    const objects = document.getElementsByClassName("product-item");
    for (let i = 0; i < objects.length; i++) {
        objects[i].addEventListener("click", () => {
            const id = parseInt(objects[i].getAttribute("item-id"));
            setNewItemSelected(id);
            objects[i].classList.add("item-active");
        })
    }

    //action
    const actions = document.getElementsByClassName("action");
    for (let i = 0; i < actions.length; i++) {
        actions[i].addEventListener("click", () => {
            const type = actions[i].getAttribute("type");
            if (type == "next") {
                setNewItemSelected(itemSelected.id < 4 ? itemSelected.id + 1 : 4);
            } else {
                setNewItemSelected(itemSelected.id === 1 ? 1 : itemSelected.id - 1);
            }
        })
    }

}

const setNewItemSelected = function (id) {
    var itemShadow = document.getElementsByClassName("item-shadow")[0];
    if (itemSelected.id !== 1) {
        itemShadow.classList.remove('item-shadow-' + itemSelected.id);
    }
    itemSelected = data.find((f) => f.id == id);
    itemShadow.classList.add('item-shadow-' + itemSelected.id);
    resetListSelect();
    changeSelectedFood();
    changeSelectedBar();
    refreshScrollreveal();
}

const resetListSelect = function () {
    const objects = document.getElementsByClassName("product-item");
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.remove("item-active");
    }
}

const changeSelectedFood = function () {
    const foodView = document.getElementById("quick-view");
    const rotate = (itemSelected.id - 1) * 90;
    foodView.style.transform = `rotate(${rotate}deg)`;

    const selectedId = document.getElementById("selected-id");
    selectedId.style.animation = "typing-remove .5s forwards";

    const selectedLocation = document.getElementById("selected-location");
    selectedLocation.innerHTML = itemSelected.location;
    selectedLocation.style.animation = "typing 1s forwards";

    const selectedName = document.getElementById("selected-name");
    selectedName.style.animation = "typing-remove .5s forwards";

    //rate
    const rateNumberArea = document.getElementById("rate-number-area");
    rateNumberArea.style.backgroundColor = itemSelected.comment.color;

    const rateNumber = document.getElementById("rate-number");
    rateNumber.style.animation = "typing-remove .5s forwards";

    const rateName = document.getElementById("rate-name");
    rateName.innerHTML = itemSelected.comment.name;
    rateName.style.animation = "typing 1s forwards";

    const rateId = document.getElementById("rate-id");
    rateId.style.animation = "typing-remove .5s forwards";

    const rateContent = document.getElementById("rate-content");
    rateContent.innerHTML = itemSelected.comment.content;
    rateContent.style.animation = "scroll .5s forwards";

    setTimeout(() => {
        selectedLocation.style.removeProperty("animation");
        selectedName.style.removeProperty("animation");
        selectedName.innerHTML = itemSelected.name;
        selectedName.style.animation = "typing 1s forwards";
        selectedId.style.removeProperty("animation");
        selectedId.innerHTML = `#${itemSelected.numOrder} Most loved dish`;
        selectedId.style.animation = "typing .5s forwards";

        //rate
        rateNumber.style.removeProperty("animation");
        rateNumber.innerHTML = itemSelected.comment.rate;
        rateNumber.style.animation = "typing-number 1s forwards";
        rateName.style.removeProperty("animation");
        rateId.style.removeProperty("animation");
        rateId.innerHTML = itemSelected.comment.id;
        rateId.style.animation = "typing 1s forwards";
        rateContent.style.removeProperty("animation");
    }, 500);
}

const changeSelectedBar = function () {
    const bars = document.getElementsByClassName("selected-bar-item");
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.remove("selected");
    }
    const newBar = document.getElementById(`selectedbar-${itemSelected.id}`);
    newBar.classList.add("selected");
}

const refreshScrollreveal = function () {
    const objects = document.getElementsByClassName("isotope-hidden");
    for (let i = 0; i < objects.length; i++) {
        objects[i].classList.remove('isotope-hidden');
    }
}

utScrollReveal();
genListProduct();