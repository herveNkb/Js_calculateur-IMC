const BMIData = [
    {name: "Maigreur", color: "midnightblue", range: [0, 18.5]},
    {name: "Bonne santé", color: "green", range: [18.5, 25]},
    {name: "Surpoids", color: "lightcoral", range: [25, 30]},
    {name: "Obésité modérée", color: "orange", range: [30, 35]},
    {name: "Obésité sévère", color: "crimson", range: [35, 40]},
    {name: "Obésité morbide", color: "purple", range: 40},
];

// IMC = poids en kg / taille² en m

const form = document.querySelector("form");
form.addEventListener("submit", handleForm);

function handleForm(event) {
    // L'action du submit reste au niveau du formulaire
    event.preventDefault();

    // Appel la fonction pour calculer l'IMC
    calculateBMI();
}

const inputs = document.querySelectorAll("input");

function calculateBMI() {
    // Récupère les valeurs des deux inputs 
    const height = inputs[0].value;
    const weight = inputs[1].value;

    // Les deux premières vérifient si les inputs sont false (donc vide),
    // les deux dernières vérifie que ce ne soit pas un nbe négatif.
    if (!height || !weight || height <= 0 || weight <= 0) {
        handleError()
        return;
    }


    // On calcule l'IMC.
    // Math.pow permet de calculer avec un exposant, ici un 2 car, c'est un carré.
    // toFixed à une valeur de 1 pour : un chiffre après la virgule.
    const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);

    showResult(BMI);
}

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

function handleError() {
    displayBMI.textContent = "Wops";
    // Remet la couleur de base en cas d'erreur.
    displayBMI.style.color = "inherit"
    result.textContent = "Remplissez correctement les champs, merci !"
}


// Affichage du résultat
function showResult(BMI) {
    // find retourne le premier bon élément du tableau qui est, ici, retourné par le callback
    const rank = BMIData.find(data => {
        if (BMI >= data.range[0] && BMI < data.range[1])
            return data;
        // Vu que le dernier range, n'est pas un tableau, mais un nombre
        else if (typeof data.range === "number" && BMI >= data.range)
            return data;
    })

    displayBMI.textContent = BMI;
    displayBMI.style.color = `${rank.color}`;
    result.textContent = `Résultat : ${rank.name}`
}


































