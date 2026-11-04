    const listeEleves = document.getElementById("liste-eleves");
    const compteur = document.getElementById("compteur");
    const recherche = document.getElementById("recherche");
    const filtreGroupe = document.getElementById("filtre-groupe");
    const aucunResultat = document.getElementById("aucun-resultat");

    function calculerMoyenne(notes) {
        if (!notes.length) {
            return null;
        }

        let totalNote = 0;

        notes.forEach(note => {
            totalNote += note;
        });

        return totalNote / notes.length;
    }

    function texteMoyenne(moyenne) {

        if (moyenne === null) {
            return "—";
        }

        let num = moyenne.toFixed(1);

        num = num.replace(".", ",");

        return num + " / 20";
    }

    function creerLigne(eleve) {   /*ajouter id d elv */
        const li = document.createElement("li");

        li.classList.add(
            "rounded-2xl",
            "border",
            "border-line",
            "bg-card",
            "p-3"
        );

        li.dataset.id = eleve.id;

        const moyenne = calculerMoyenne(eleve.notes);  /*calc moyenne  */

        const moyenneText = texteMoyenne(moyenne);

        const initiales = `${eleve.prenom[0]}${eleve.nom[0]}`;

        const container = document.createElement("div");  /*creer conteneur */

        container.classList.add(
            "flex", "flex-col", "gap-3",
            "lg:flex-row", "lg:items-center"
        );

        const boutonFiche = document.createElement("button"); /*creer boutton */

        boutonFiche.type = "button";

        boutonFiche.classList.add(
            "btn-fiche", "flex", "min-h-11",
            "flex-1", "items-center", "gap-3", "text-left"
        );

        const avatar = document.createElement("span"); /*creer avatar poser les prem lettres du prenom*/

        avatar.classList.add(
            "grid", "size-10", "shrink-0",
            "place-items-center", "rounded-full",
            "bg-brand-soft", "text-sm",
            "font-semibold", "text-brand"
        );

        avatar.textContent = initiales;

        const informations = document.createElement("span"); /*creer infor */

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
        
        const buttonAbsent = document.createElement("button");
        buttonAbsent.type = "button";
        buttonAbsent.textContent = "absent";
        buttonAbsent.dataset.action = "absent";
        buttonAbsent.classList.add(
            "btn-absent" , "rounded-full" , "border" ,  "px-3" , "py-2"
        );
          container.append(buttonAbsent)

          const inputNote = document.createElement("input");
          inputNote.type = "number";
          inputNote.placeholder = "note / 20";
          inputNote.classList.add("input-note");
          const buttonNote = document.createElement("button");

        buttonNote.type = "button";
        buttonNote.textContent = "Ajouter la note";
        buttonNote.dataset.action = "note";

        container.append(inputNote, buttonNote);

        const messageNote =document.createElement("p")
        messageNote.textContent = ""
        messageNote.hidden = true;
        container.append(messageNote)
        li.append(container);

        return li;
    }


    function afficherGroupes() {    /*affichage des groupes */

        groupes.forEach(groupe => {

            const option = document.createElement("option");

            option.value = groupe.id;

            option.textContent = groupe.nom;

            filtreGroupe.appendChild(option);

        });

    }

    function afficherEleves() {     /*affichage des eleves */

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

        listeEleves.replaceChildren(); /*supp les enciens */

        const lignes = elevesFiltres.map(creerLigne); /*creer ligne pour les eleves filtrer */

        lignes.forEach(ligne => {  /*poser les lignes dans la page */

            listeEleves.appendChild(ligne);

        });

        compteur.textContent = `${elevesFiltres.length} élèves`;

        aucunResultat.hidden = elevesFiltres.length !== 0;

    }
    afficherGroupes();
    afficherEleves();

    recherche.addEventListener("input", afficherEleves);

    filtreGroupe.addEventListener("change", afficherEleves);

    listeEleves.addEventListener("click", (event) =>{

        const button = event.target.closest("[data-action]");
        if (!button) {
        return;
    }

    const ligne = button.closest("li");

    const id = Number(ligne.dataset.id);

    const eleve = eleves.find(e => e.id === id);
    if (button.dataset.action === "absent") {
        eleve.absences++
        const nouvelleLigne = creerLigne(eleve);
        ligne.replaceWith(nouvelleLigne);
    }
else if (button.dataset.action === "note") {

    const inputNote = ligne.querySelector(".input-note");

    const messageNote = ligne.querySelector("p");

    const valeur = inputNote.value.trim();

    const note = Number(valeur);

    if (valeur === "" || note < 0 || note > 20) {
        messageNote.textContent = "La note doit être entre 0 et 20.";
    
        messageNote.hidden = false;
        return;
    }

    eleve.notes.push(note);

    const nouvelleLigne = creerLigne(eleve);
    ligne.replaceWith(nouvelleLigne);
}
    })