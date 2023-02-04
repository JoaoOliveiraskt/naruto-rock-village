const listCharacters = document.querySelector("#main")

async function main() {
    const query = `{
        characters(filter: {village: "rock"}) {
        results{
        avatarSrc,
        name,
        description,
        rank,
        village
        }
      }
    } `

    const response = await fetch(`https://narutoql.up.railway.app/graphql/?query=${query}`);
    const data = await response.json();

    if (response.ok) {
        showCharacters(data.data.characters.results);
    } else {
        console.error("Dados inválidos recebidos da API");
    }
}; 

function showCharacters(results) {
    let model = '';

    results.forEach(
        result => 
        (model += `
        <div class='media card'>
            <img class='imageCharacter' src="${result.avatarSrc}">
            <div class='media-body'>
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                <p>Rank:${result.rank}</p>
                <p>Village:${result.village}</p>
            </div>
        </div>
        `
        )
    );

    listCharacters.innerHTML = `
    <ul class='list'>
        ${model}
    </ul>
    `
}

main();


