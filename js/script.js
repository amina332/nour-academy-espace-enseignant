    const listeEleves = document.getElementById("liste-eleves");
    const compteur = document.getElementById("compteur");
    const recherche = document.getElementById("recherche");
    const filtreGroupe = document.getElementById("filtre-groupe");
    const aucunResultat = document.getElementById("aucun-resultat");
    const listeParents = document.getElementById("liste-parents");
    const aucuneAlerte = document.getElementById("aucune-alerte");

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
            "avatar", "grid", "size-10", "shrink-0",
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

        if (eleve.absences >= 3) {   /*met la case en rouge apres 3 abs */
            li.classList.add("alerte");

            const badge = document.createElement("span");

            badge.classList.add(
                "badge", "ml-1", "whitespace-nowrap", "rounded-full",
                "bg-alert", "px-2", "py-0.5", "text-xs",
                "font-medium", "text-white"
            );

            badge.textContent = "Prévenir les parents";

            absences.append(badge);
        }

        const moyenneElement = document.createElement("span");    /*affichage du moy */

        moyenneElement.classList.add("font-serif", "text-xl");

        moyenneElement.textContent = moyenneText;

        informations.append(nom, absences);

        boutonFiche.append(avatar, informations, moyenneElement);

        container.append(boutonFiche);

        const actions = document.createElement("div"); /*groupe absent + note */

        actions.classList.add("flex", "gap-2");

        const buttonAbsent = document.createElement("button"); /*boutton absent */

        buttonAbsent.type = "button";
        buttonAbsent.textContent = "Absent";
        buttonAbsent.dataset.action = "absent";
        buttonAbsent.classList.add(
            "btn-absent", "h-11", "rounded-full", "border", "border-line",
            "px-3", "sm:px-4", "text-sm", "font-medium", "hover:bg-paper"
        );

        const labelNote = document.createElement("label"); /*label pour le champ note */

        labelNote.classList.add("flex-1");

        const texteLabel = document.createElement("span");

        texteLabel.classList.add("sr-only");
        texteLabel.textContent = "Note sur 20";

        const inputNote = document.createElement("input"); /*creer nvl case */

        inputNote.type = "number";
        inputNote.min = "0";
        inputNote.max = "20";
        inputNote.step = "0.5";
        inputNote.placeholder = "Note";
        inputNote.classList.add(
            "champ-note", "h-11", "w-full", "rounded-full", "border",
            "border-line", "bg-paper", "px-4", "text-sm", "lg:w-24"
        );

        labelNote.append(texteLabel, inputNote);

        const buttonNote = document.createElement("button"); /*creer btn du note */

        buttonNote.type = "button";
        buttonNote.textContent = "Ajouter la note";
        buttonNote.dataset.action = "note";
        buttonNote.classList.add(
            "btn-note", "h-11", "rounded-full", "bg-ink", "px-3", "sm:px-4",
            "text-sm", "font-medium", "text-white", "hover:bg-brand"
        );

        actions.append(buttonAbsent, labelNote, buttonNote);

        container.append(actions);

        const messageNote = document.createElement("p"); /*message d erreur */

        messageNote.classList.add("message", "mt-2", "text-xs", "text-alert");
        messageNote.textContent = "La note doit être un nombre entre 0 et 20.";
        messageNote.hidden = true;

        li.append(container, messageNote);

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

        afficherParents();

    }

    function afficherParents() {    /*parents des eleves en alerte, dans le panneau lateral */

        const groupeSelectionne = filtreGroupe.value;

        const elevesEnAlerte = eleves.filter(eleve => {

            const correspondGroupe =
                groupeSelectionne === "" ||
                eleve.groupeId === Number(groupeSelectionne);

            return correspondGroupe && eleve.absences >= 3;

        });

        listeParents.replaceChildren(); /*supp les enciens */

        elevesEnAlerte.forEach(eleve => {

            const li = document.createElement("li");

            li.classList.add("rounded-xl", "bg-card", "px-3", "py-2", "ring-1", "ring-line");

            li.textContent = `${eleve.prenom} ${eleve.nom} — ${eleve.telephoneParent}`;

            listeParents.appendChild(li);

        });

        aucuneAlerte.hidden = elevesEnAlerte.length !== 0;

    }

    afficherGroupes();
    afficherEleves();

    recherche.addEventListener("input", afficherEleves);

    filtreGroupe.addEventListener("change", afficherEleves);

    listeEleves.addEventListener("click", (event) => {  /*un seul ecouteur pour toutes les lignes */

        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const ligne = button.closest("li");

        const id = Number(ligne.dataset.id);

        const eleve = eleves.find(e => e.id === id);

        if (button.dataset.action === "absent") {

            eleve.absences++;

            afficherParents();

        } else if (button.dataset.action === "note") {

            const valeur = ligne.querySelector(".champ-note").value.trim();

            const note = Number(valeur);

            if (valeur === "" || Number.isNaN(note) || note < 0 || note > 20) {
                ligne.querySelector(".message").hidden = false;
                return;
            }

            eleve.notes.push(note);
        }

        ligne.replaceWith(creerLigne(eleve)); /*seule cette ligne est mise a jour */
    });