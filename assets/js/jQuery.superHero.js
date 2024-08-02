jQuery.fn.superHero = function (accessKey, idHero) {

  let accessToken = accessKey
  let idSuperHero = idHero;
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://superheroapi.com/api.php/${accessToken}/${idSuperHero}`,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "Accept": "*/*"
    }
  };
  $.ajax(settings)
    .done(function (response) {
      const dataCharacters = [];
      for (const stat in response.powerstats) {
        if (response.powerstats[stat] !== "null") {
          dataCharacters.push({ y: Number(response.powerstats[stat]), label: stat })
        } else {
          continue;
        }
      }
      $("#heroStats").CanvasJSChart({

        title: {
          animationEnabled: true,
          text: `Estadísticas de Poder para ${response.name}`,
          fontSize: 28
        },
        data: [
          {
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            dataPoints: dataCharacters
          }
        ]
      })

      heroBio(response)
    })
    .fail();


  return this
}

function heroBio(response) {
  let heroCard = `
    <h3 class="text-center">SuperHero Encontrado</h3>
    <div class="card mb-3 me-2" style="max-width: 50rem;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${response.image.url}" class="img-fluid rounded-start h-100 w-100" alt="...">
        </div>
        <div class="col-md-8">

          <div class="card-body">
            <h5 class="card-title">${response.name}</h5>
            <p class="card-text">Conexiones: ${response.connections.relatives}</p>
            <em class="card-text"><small class="text-body-secondary">Publicado por: ${response.biography.publisher}</small></em>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Ocupación: ${response.work.occupation}</li>
            <li class="list-group-item">Primera Aparición: ${response.biography["first-appearance"]}</li>
            <li class="list-group-item">Altura: ${response.appearance.height[1]}</li>
            <li class="list-group-item">Peso: ${response.appearance.weight[1]}</li>
            <li class="list-group-item">Alianzas: ${response.connections["group-affiliation"]}</li>
          </ul>
        </div>
      </div>
    </div>
  `

  $("#heroBio").html(heroCard);
}