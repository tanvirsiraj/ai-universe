const loadAiData = async (dataLimit) => {

    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiData(data.data.tools, dataLimit);
}

const displayAiData = (data, dataLimit) => {
    // console.log(data)
    const aiCardContainer = document.getElementById('ai-card-container');

    aiCardContainer.innerHTML = '';
    // display 6 data by default
    data = data.slice(0, dataLimit);
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
                    <i onclick="loadAiCardDetails('${data.id}')" class="cursor fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
            </div>
        </div >
    `

        aiCardContainer.appendChild(aiDiv);
    });
    toggleSpinner(false);
    document.getElementById('sort-by-date').classList.remove('d-none');
    // console.log(data.length);

    if (data.length == 12) {
        document.getElementById('see-more').classList.add('d-none');
    }

    else {
        document.getElementById('see-more').classList.remove('d-none');
    }

}

const loadAiCardDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);

}
// detailsBtn function 
function displayDetails(data) {
    console.log('details btn clicked', data);
    const modalCardLeft = document.getElementById('modal-card-left');
    const modalCardRight = document.getElementById('modal-card-right');

    modalCardLeft.innerHTML = `
        <h5 class="card-title">${data.description}</h5>
        <div class="d-md-flex justify-content-between my-3">
           <div class="text-center text-success shadow-lg p-2 border rounded mb-2">
                ${data.pricing ? `<h5>${data.pricing[0].price}</h5><h5>Basic</h5>` : `<h5>Free of Cost</h5>`}
           </div>
           <div class="text-center text-warning shadow-lg p-2 border rounded mb-2">
                ${data.pricing ? `<h5>${data.pricing[1].price}</h5><h5>Pro</h5>` : `<h5>Free of Cost</h5>`}
           </div>
           <div class="text-center text-danger shadow-lg p-2 border rounded mb-2">
                ${data.pricing ? `<h5>${data.pricing[2].price}</h5><h5>Enterprise</h5>` : `<h5>Free of Cost</h5>`}
           </div>
        </div>
    `
    modalCardRight.innerHTML = `
            <img class="img-fluid" src="${data.image_link[0]}">
    `

}


const sortByDate = document.getElementById('sort-by-date');
// sort by date event handler 
sortByDate.addEventListener('click', function () {
    // console.log('sort by date clicked');

    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySortData(data.data.tools))
    const displaySortData = (data) => {
        // console.log(data);
        displayAiData(data.sort(customSort), 12);
    }

    const customSort = (a, b) => {
        return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf();
    }

})

// see more event handler 
const seeMoreBtn = document.getElementById('see-more');
seeMoreBtn.addEventListener('click', function () {
    // console.log('see more button clicked');
    setTimeout(() => {
        loadAiData(12);
    }, 2000)
    toggleSpinner(true);
    seeMoreBtn.classList.add('d-none');
})

// spinner arrow function
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none')
    }
}

// load event handler for spinner
window.addEventListener('load', () => {
    setTimeout(() => {
        loadAiData(6);
    }, 2000)
    toggleSpinner(true);

});

