$(document).ready(function () {
  $("button").click(function () {
    $("textarea").val(`
    ${$("#marque").val() + " " + $("#produit").val()}
    ${$("#marque").val() + " " + $("#modele").val()}
    ${$("#marque").val() + " " + $("#reference").val()} 
    ${$("#produit").val() + " " + $("#marque").val() + " " + $("#specification").val()} `);
  });


});


    // On sélectionne le formulaire
    var form_copier_coller = document.getElementById("generateur")
    // On sélectionne le <textarea>
    var textarea_texte = document.getElementById("copierarea")

    // Copier le texte
    copierTexte = (e) => {
        // On désactive l'action du formulaire
        e.preventDefault()
        // 1. Si le <textarea> n'est pas vide
        if (textarea_texte.value.length) {
            // 2. On copie le texte dans le presse-papier
            navigator.clipboard.writeText(textarea_texte.value).then(() => {
                // 3. On réinitialise le formulaire
                // form_copier_coller.reset()
                // 4. On affiche l'alert
                alert("Texte copié !")
            })
        } else {
            alert("Veillez saisir le texte à copier")
        }
    }



    


