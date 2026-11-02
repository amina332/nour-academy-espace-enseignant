function calculerMoyene(notes) {
    if (!notes.length) {
        return null
    }
let totalNote = 0
notes.forEach(note=> {
   totalNote += note 
});
 return totalNote / notes.length
}
function texteMoyenne(moyenne) {
    if (moyenne === null) {
        return "__"
    }
    else{
        let num =moyenne.toFixed(1);
        num = num.replace(".", ",");
        return + " /20";
    }
}
function creerLigne(eleve) {
    const Li = document.createElement("Li");
    Li.classList.add( "rounded-2xl", "border", "border-line", "bg-card", "p-3");
}
Li.dataset.id = eleve.id; 
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
