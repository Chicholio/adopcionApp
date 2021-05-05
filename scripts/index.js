import { dogsDB } from "./dogsDB.js";
import { catsDB } from "./catsDB.js";

let dogsButton = document.getElementById("dog-category");
let catsButton = document.getElementById("cat-category");
let petsContainer = document.querySelector(".pets-container");


dogsButton.addEventListener("click", verifyPets);
catsButton.addEventListener("click", verifyPets);

function verifyPets(p) {
    let current = p.currentTarget;
    let opacityVerify = current.classList.contains("opacity");
    let petsData;
    if (!opacityVerify) {
        return
    } else if (current.getAttribute("name") == "dogs") {
        petsData = dogsDB;
    } else {
        petsData = catsDB;
    }

    listDogs(current, petsData);
}

function listDogs(current, petsData) {
    let petContainer = ``;
    let singlePet;
    let cont = 1;
    for (const idPet in petsData) {
        let relative = "relative-up";
        let pet = petsData[idPet];
        let namePet = pet.namePet;
        let breed = pet.breed;
        let petPhoto = pet.petPhoto;
        let id = pet.id;

        if (cont % 2 == 0) {
            relative = "relative-down"
        }

        singlePet = `
            <a href="vista-detalle.html" class="scene_element scene_element--fadeinup">
                <div style="background-image:linear-gradient(180deg, rgba(255, 255, 255, 0) 26.42%, #000000 99.33%), url('${petPhoto}') ;" class="pets ${relative}" name="${id}">
                    <p class="bold2 white-text">${namePet}</p>
                    <p class="regular2 white-text">${breed}</p>
                </div>
            </a>
        `

        cont += 1;
        petContainer += singlePet;
    }

    petsContainer.innerHTML = petContainer;
    current.classList.remove("opacity");
    current.classList.add("no-select");

    if (current.getAttribute("name") == "dogs") {
        catsButton.classList.add("opacity");
        catsButton.classList.remove("no-select")
        localStorage.removeItem("cat");
    } else {
        dogsButton.classList.add("opacity");
        dogsButton.classList.remove("no-select")
        localStorage.setItem("cat", "exist");
    }
}

if (localStorage.getItem("cat")) {
    listDogs(catsButton, catsDB)
} else {
    listDogs(dogsButton, dogsDB)
}

petsContainer.addEventListener("click", goToDetail)

function goToDetail(e) {
    let petsData;
    let current = e.currentTarget;
    let target = e.target;
    if (!(target.classList.contains("card"))) {
        target = target.parentElement;
    }   
    let idPet = target.getAttribute("name");
    if (idPet[0] === "d") {
        petsData = dogsDB;
    } else {
        petsData = catsDB;
    }
    localStorage.setItem("detailView", JSON.stringify(petsData[idPet]));
}