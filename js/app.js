const loadAiData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiData(data.data.tools);

}

const displayAiData = (data) => {
    // console.log(data)
    const aiCardContainer = document.getElementById('ai-card-container');

    // display 6 data by default
    data = data.slice(0, 6);
    console.log(data);
    data.forEach(data => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        
        <div class="card h-100 p-2">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
    </div>
        `

        aiCardContainer.appendChild(aiDiv);
    })
}

loadAiData();