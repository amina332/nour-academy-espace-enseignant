function calculerMoyenne(notes) {
    if (!notes.length) {
        return null;
    }   

    let totalNote = 0;

    notes.forEach(note => {
        totalNote += note
    });

    return totalNote / notes.length;
}

function texteMoyenne(moyenne) {
    if (moyenne === null) {
        return "—";
    } else {
        let num = moyenne.toFixed(1);

        num = num.replace(".", ",");

        return num + " / 20";
    }
}

function creerLigne(eleve) {
    const li = document.createElement("li");
    li.classList.add(
        "rounded-2xl",
        "border",
        "border-line",
        "bg-card",
        "p-3"
    );

    li.dataset.id = eleve.id;

    const moyenne = calculerMoyenne(eleve.notes);

    const moyenneText = texteMoyenne(moyenne);

    const initiales = `${eleve.prenom[0]}${eleve.nom[0]}`;

    const container = document.createElement("div");
    container.classList.add(
        "flex", "flex-col", "gap-3",
        "lg:flex-row", "lg:items-center"
    );

    const boutonFiche = document.createElement("button");
    boutonFiche.type = "button";
    boutonFiche.classList.add(
        "btn-fiche", "flex", "min-h-11",
        "flex-1", "items-center", "gap-3", "text-left"
    );

    const avatar = document.createElement("span");
    avatar.classList.add(
        "grid", "size-10", "shrink-0",
        "place-items-center", "rounded-full",
        "bg-brand-soft", "text-sm",
        "font-semibold", "text-brand"
    );
    avatar.textContent = initiales;

    const informations = document.createElement("span");
    informations.classList.add("min-w-0", "flex-1");

    const nom = document.createElement("span");
    nom.classList.add("block", "truncate", "font-medium");
    nom.textContent = `${eleve.prenom} ${eleve.nom}`;

    const absences = document.createElement("span");
    absences.classList.add("block", "text-sm", "text-muted");
    absences.textContent = `${eleve.absences} absence(s)`;

    const moyenneElement = document.createElement("span");
    moyenneElement.classList.add("font-serif", "text-xl");
    moyenneElement.textContent = moyenneText;

    informations.append(nom, absences);
    boutonFiche.append(avatar, informations, moyenneElement);

    container.append(boutonFiche);
    li.append(container);

    return li;
}

    const listeEleves = document.getElementById("liste-eleves");
    const compteur = document.getElementById("compteur");

function afficherEleves() {

    listeEleves.replaceChildren();

    const lignes = eleves.map(creerLigne);

    lignes.forEach(ligne => {
        listeEleves.appendChild(ligne);
    });

    compteur.textContent = `${eleves.length} élèves`;
}

afficherEleves();

    const recherche = document.getElementById("recherche")
    const filtre_groupe = document.getElementById("filtre-groupe")
filtre_groupe.addEventListener("change", () => {
let groupeChoisi = filtre_groupe.value;
 let elevesFiltres = eleves.filter((eleve) => {
        return eleve.groupeId == groupeChoisi;
    });
    console.log(elevesFiltres);
});

    const filtreGroupe = document.getElementById("filtre-groupe");
    const aucunResultat = document.getElementById("aucun-resultat");

function afficherGroupes() {
    groupes.forEach(groupe => {
        const option = document.createElement("option");

        option.value = groupe.id;
        option.textContent = groupe.nom;

        filtreGroupe.appendChild(option);
    });
}
function afficherEleves() {

    const groupeSelectionne = filtreGroupe.value;
    const rechercheTexte = recherche.value.trim().toLowerCase();

    const elevesFiltres = eleves.filter(eleve => {

        const correspondGroupe =
            groupeSelectionne === "" ||
            eleve.groupeId === Number(groupeSelectionne);

        const nomComplet =
            `${eleve.prenom} ${eleve.nom}`.toLowerCase();

        const correspondRecherche =
            nomComplet.includes(rechercheTexte);

        return correspondGroupe && correspondRecherche;
    });

    listeEleves.replaceChildren();

    const lignes = elevesFiltres.map(creerLigne);

    lignes.forEach(ligne => {
        listeEleves.appendChild(ligne);
    });

    compteur.textContent = `${elevesFiltres.length} élèves`;

    aucunResultat.hidden = elevesFiltres.length !== 0;
}
recherche.addEventListener("input", afficherEleves);

filtreGroupe.addEventListener("change", afficherEleves);