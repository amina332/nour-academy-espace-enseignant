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
        
    }
}