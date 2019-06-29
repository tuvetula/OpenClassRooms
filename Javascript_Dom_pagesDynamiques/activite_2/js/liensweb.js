var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

function display() {
    //Effacer les enfants de sectionContenu
    while (sectionContenu.childElementCount != 0) {
        sectionContenu.removeChild(sectionContenu.firstChild);
    }
    //Affiche les objets de listeLiens
    for (let i = 0; i < listeLiens.length; i++) {
        let paragraphe = document.createElement("p");
        paragraphe.className = "lien";
        //title
        let title = document.createElement("a");
        title.href = listeLiens[i].url;
        title.textContent = listeLiens[i].titre;
        title.style.color = "#428bca";
        title.style.fontWeight = "bold";
        title.style.textDecoration = "none";
        //span
        let spanUrl = document.createElement("span");
        spanUrl.textContent = listeLiens[i].url;
        spanUrl.style.paddingLeft = "5px";
        //auteur
        let auteur = document.createElement("p");
        auteur.textContent = "Ajouté par " + listeLiens[i].auteur;

        paragraphe.appendChild(title);
        paragraphe.appendChild(spanUrl);
        paragraphe.appendChild(auteur);
        sectionContenu.appendChild(paragraphe);
        divContenu.appendChild(sectionContenu);
    }
}

//Recup div id contenu
let divContenu = document.getElementById("contenu");

//Création balise section dans div "contenu"
let section = document.createElement("section");
section.id="sectionNewEntry";
divContenu.appendChild(section);

//Recup section id sectionNewEntry
let sectionContenu = document.getElementById("sectionNewEntry");


//Appelle fonction display (affichage)
display();


//Activité 2

//Création bouton "Ajouter un lien"
let buttonCreate = document.createElement("button");
buttonCreate.textContent="Ajouter un lien";
buttonCreate.id="button";
divContenu.insertAdjacentElement("afterbegin",buttonCreate);

//Recup button id button
let button = document.getElementById("button");

//Evenement sur click button Ajouter un lien
button.addEventListener("click", function (e) {
    button.style.display = "none";

    //Création bouton Ajouter
    let buttonAddNewLink = document.createElement("button");
    buttonAddNewLink.id = "Ajouter";
    buttonAddNewLink.textContent = "Ajouter";
    buttonAddNewLink.style.marginLeft = "20px";
    divContenu.insertAdjacentElement("afterbegin", buttonAddNewLink);

    //Création input adresseUrl
    let urlNewLink = document.createElement("input");
    urlNewLink.id = "link";
    urlNewLink.type = "text";
    urlNewLink.placeholder = "Entrez l'URL du lien";
    urlNewLink.style.marginLeft = "20px";
    urlNewLink.style.width = "25%";
    divContenu.insertAdjacentElement("afterbegin", urlNewLink);

    //Création input titleLink
    let titleNewLink = document.createElement("input");
    titleNewLink.id = "title";
    titleNewLink.type = "text";
    titleNewLink.placeholder = "Entrez le titre du lien";
    titleNewLink.style.marginLeft = "20px";
    titleNewLink.style.width = "15%";
    divContenu.insertAdjacentElement("afterbegin", titleNewLink);

    //Création input name
    let name = document.createElement("input");
    name.id = "name";
    name.type = "text";
    name.placeholder = "Entrez votre nom";
    name.style.width="15%";
    divContenu.insertAdjacentElement("afterbegin", name);

    //Evenement sur click sur le bouton Ajouter
    buttonAddNewLink.addEventListener("click", function (e) {
        let nameEntry = document.getElementById("name").value;
        let titleEntry = document.getElementById("title").value;
        let urlEntry = document.getElementById("link").value;
        let VerifName=false;
        let verifTitle=false;
        let verifMail=false;

        //Verif champ name
        if (nameEntry == "") {
            document.getElementById("name").style.borderColor = "red";
        }else{
            document.getElementById("name").style.borderColor="white";
            VerifName=true;
        }

        //Verif champ title
        if (titleEntry == "") {
            document.getElementById("title").style.borderColor = "red";
        }else{
            document.getElementById("title").style.borderColor="white";
            verifTitle=true;
        }

        //Verif mail
        let regexpMail = /^https:\/\//;
        let regexpMail2 = /^http:\/\//;
        if(!urlEntry==""){
            document.getElementById("link").style.borderColor="white";
            verifMail=true;
            if (regexpMail.test(urlEntry)==false && regexpMail2.test(urlEntry)==false) {
                urlEntry = "http://"+urlEntry;
            }
        }else{
            document.getElementById("link").style.borderColor="red";
        }

        //Si toutes les conditions sont respectées alors:
        if (VerifName && verifTitle && verifMail){

            //Création nouvel objet
            let newObject = new Object;
            newObject.titre = titleEntry;
            newObject.url = urlEntry;
            newObject.auteur = nameEntry;

            //Ajout nouvel objet au tableau listeLiens
            listeLiens.unshift(newObject);

            //Affichage liens
            display();

            //Suppression des champs de saisie et du bouton ajouter
            divContenu.removeChild(document.getElementById("name"));
            divContenu.removeChild(document.getElementById("title"));
            divContenu.removeChild(document.getElementById("link"));
            divContenu.removeChild(document.getElementById("Ajouter"));
    
            //Affichage du bouton "Ajouter un lien"
            button.style.display="inline";

            //Création notification d'ajout
            let notification=document.createElement("p");
            notification.className="lien";
            notification.id="notification";
            notification.textContent="Le lien \""+titleEntry+"\" a bien été ajouté";
            notification.style.backgroundColor="rgb(214,236,246)";
            notification.style.color="blue";
            divContenu.insertAdjacentElement("afterbegin",notification);

            //Disparition de la notification après 2 secondes
            setTimeout(function(){
                divContenu.removeChild(document.getElementById("notification"));
            },2000);
        }
    })
})