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
            <img  src="${data.image}" class="card-img-top img-fluid h-100 rounded" alt="...">
            <div class="card-body p-0 py-3">
                <h5 class="card-title">Features</h5>
               
                    <p class="card-text">1. ${data.features[0]}</p>
                    <p class="card-text">2. ${data.features[1]}</p>
                    <p class="card-text">3. ${data.features[2]}</p>
       
            </div >
            <div class="card-footer p-0 py-3 d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="card-title">${data.name}</h5>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-calendar-check"></i>
                        <p class="card-text">${data.published_in}</p>
                    </div>
                </div>
                <div class="text-danger">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div >
    `

        aiCardContainer.appendChild(aiDiv);
    })
}

loadAiData();