$("section").hide();

$(document).on("click", "#liste-contacts", function (e) {
  e.preventDefault();
  $("section").hide();
  liste();
});

$(document).on("click", "#nv-contact", function (e) {
  e.preventDefault();
  $("section").hide();
  $(".ajout-contact").show();
});

$(document).on("submit", ".ajout-contact form", function (e) {
  e.preventDefault();
  $("section").hide();
  ajoutContact();
});

$(document).on("click", "button.modif-contact ", function (e) {
  $("section").hide();
  $("section.modif-contact").show();
  modifContact($(this).attr("id"));
});

$(document).on("submit", ".modif-contact form", function (e) {
  e.preventDefault();
  $("section").hide();
  $(".modif-contact form").show();
  majContact($(".modif-contact .maj-contact ").attr("id"));
});

$(document).on("click", ".supp-contact", function () {
  suppContact($(this).attr("id"));
});

$(document).on("click", "#tab-de-bord", function (e) {
  e.preventDefault();
  $("section").hide();
  tableau();
});

function liste() {
  let request = $.ajax({
    type: "GET",
    url: "http://localhost:3000/contacts",
    dataType: "json",
  });

  request.done(function (response) {
    let html = "";
    if (response.length !== 0) {
      html += ` <h1>Liste des contacts </h1>
			<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">#ID</th>
					<th scope="col">Nom</th>
					<th scope="col">Prenom</th>
					<th scope="col">Adresse</th>
					<th scope="col">Email</th>
					<th scope="col">Tel</th>
					<th scope="col">Catégorie</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>`;
      response.map((contact) => {
        html += `
			<tr>
					<th scope="row">${contact.id}</th>
					<td>${contact.nom}</td>
					<td>${contact.prenom}</td>
					<td>${contact.adresse}</td>
					<td>${contact.email}</td>
					<td>${contact.tel}</td>
					<td>${contact.categorie}
					</td>
					<td class = "d-flex">
					
						<button type="button" class="btn btn-info modif-contact" id="${contact.id}">
						<i class="fas fa-edit mr-1"></i>Modifier</button>

						<button type="button" class="btn btn-danger supp-contact" id="${contact.id}">
						<i class="fas fa-trash-alt mr-1"></i>Supprimer</button>
									
					</td>
			</tr>
			`;
      });

      html += `	</tbody>
					</table>`;
    } else {
      html = `
			<div class="alert alert-danger" role="alert">
  			Aucun contact ne figure dans la liste.
			</div>`;
    }
    $(".liste").html(html);
    $("section").hide();
    $(".liste").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function ajoutContact() {
  let request = $.ajax({
    type: "POST",
    url: "http://localhost:3000/contacts",
    data: {
      id: new Date().getTime(),
      nom: $("#nom").val(),
      prenom: $("#prenom").val(),
      adresse: $("#adresse").val(),
      email: $("#email").val(),
      tel: $("#tel").val(),
      categorie: $("#categorie").val(),
    },
    dataType: "json",
  });

  request.done(function (response) {
    liste();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function modifContact(id) {
  let request = $.ajax({
    type: "GET",
    url: `http://localhost:3000/contacts/${id}`,
    dataType: "json",
  });

  request.done(function (response) {
    $(".modif-contact #nom").val(response.nom);
    $(".modif-contact #prenom").val(response.prenom);
    $(".modif-contact #adresse").val(response.adresse);
    $(".modif-contact #email").val(response.email);
    $(".modif-contact #tel").val(response.tel);
    $(".modif-contact #categorie").val(response.categorie);
    $("button.maj-contact").attr("id", response.id);
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function majContact(id) {
  let request = $.ajax({
    type: "PUT",
    url: `http://localhost:3000/contacts/${id}`,
    data: {
      nom: $(".modif-contact #nom").val(),
      prenom: $(".modif-contact #prenom").val(),
      adresse: $(".modif-contact #adresse").val(),
      email: $(".modif-contact #email").val(),
      tel: $(".modif-contact #tel").val(),
      categorie: $(".modif-contact #categorie").val(),
    },
    dataType: "json",
  });

  request.done(function (response) {
    liste();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function suppContact(id) {
  let request = $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/contacts/${id}`,
    dataType: "json",
  });

  request.done(function (response) {
    liste();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}

function tableau() {
  let request = $.ajax({
    type: "GET",
    url: `http://localhost:3000/contacts`,
    dataType: "json",
  });

  request.done(function (response) {
    let Famille = 0;
    response.map((contact) => {
      if (contact.categorie === "Famille") {
        Famille += 1;
      }
    });

    let Travail = 0;
    response.map((contact) => {
      if (contact.categorie === "Travail") {
        Travail += 1;
      }
    });

    let Amis = 0;
    response.map((contact) => {
      if (contact.categorie === "Amis") {
        Amis += 1;
      }
    });

    let Autres = 0;
    response.map((contact) => {
      if (contact.categorie === "Autres") {
        Autres = +1;
      }
    });


    let html = `
		<div class ="d-flex justify-content-around">

		<div class="card" style="width: 35rem ">
		<div class="card-body text-center">
		  <h5 class="card-title">Nombre de contact :</h5>
		  <h2 class="text-center"><span class="badge badge-secondary">${response.length}</span></h2>
		</div>
	  </div>

	  <div class="card" style="width: 35rem">
		<div class="card-body text-center">
		  <h5 class="card-title">Nombre de categorie :</h5>
		  <h2 class="text-center">
			<span class="badge badge-secondary">${$("#categorie").children().length}</span>
		  </h2>
		</div>
	  </div>
	  </div>

	  <div class="card mt-5" >
   
  <div class="card-body d-flex flex-column">
    <div class="d-flex align-items-center">
      <h5 class="card-title">Nombre de Famille :</h5>
      <h2 class="ml-3">
        <span class="badge badge-secondary">${Famille}</span>
      </h2>
    </div>

    <div class="d-flex align-items-center">
      <h5 class="card-title">Nombre de Travail :</h5>
      <h2 class="ml-3">
        <span class="badge badge-secondary">${Travail}</span>
      </h2>
    </div>

    <div class="d-flex align-items-center">
      <h5 class="card-title">Nombre d'Amis :</h5>
      <h2 class="ml-3">
        <span class="badge badge-secondary">${Amis}</span>
      </h2>
    </div>

    <div class="d-flex align-items-center">
      <h5 class="card-title">Autres :</h5>
      <h2 class="ml-3">
        <span class="badge badge-secondary">${Autres}</span>
      </h2>
    </div>
  </div>

  <div class="bouton-ajout">
    <button type="button" class="btn btn-success" id ="nv-contact">Nouveau Contact</button>
    
    </div>

</div>
`;
    $(".tableau-de-bord").html(html);
    $("section").hide();
    $(".tableau-de-bord").show();
  });

  request.fail(function (http_error) {
    let server_msg = http_error.responseText;
    let code = http_error.status;
    let code_label = http_error.statusText;
    alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
  });
}
