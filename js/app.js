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
    // console.log(data);
    data.forEach(data => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        let featureListHtml = ``;
        data.features.forEach((feature, index) => {
            featureListHtml += `<p class="card-text">${index + 1}. ${feature}</p>`
        })
        aiDiv.innerHTML = `
        
        <div class="card h-100 p-2">
            <img  src="${data.image}" class="card-img-top img-fluid h-100 rounded" alt="...">
            <div class="card-body p-0 py-3">
                <h5 class="card-title">Features</h5>
                ${featureListHtml}
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
    // console.log('details btn clicked', data);
    const modalCardLeft = document.getElementById('modal-card-left');
    const modalCardRight = document.getElementById('modal-card-right');

    let pricingHtml = ``;
    const colors = ['text-success', 'text-warning', 'text-danger'];
    const pricingPackageName = ['Basic', 'Pro', 'Enterprise'];

    let i;
    data.pricing ? data.pricing.forEach((package, index) => {
        const price = ['0', 'no cost'].includes(package.price.toString().toLowerCase()) ? "Free of Cost" : package.price;
        pricingHtml += `
        <div class="text-center ${colors[index]} shadow-lg p-2 border rounded mb-2">
            <h5>${price}</h5>
            <h5>${pricingPackageName[index]}</h5>
        </div> 
        `
        i = index;
    }) : pricingHtml = `
    <div class="text-center ${colors[0]} shadow-lg p-2 border rounded mb-2">
        <div>
            <h5>Free of Cost</h5>
            <h5>${pricingPackageName[0]}</h5>
        </div>
    </div> 
    <div class="text-center ${colors[1]} shadow-lg p-2 border rounded mb-2">
        <div>
            <h5>Free of Cost</h5>
            <h5>${pricingPackageName[1]}</h5>
        </div>
    </div> 
    <div class="text-center ${colors[2]} shadow-lg p-2 border rounded mb-2">
        <div>
            <h5>Free of Cost</h5>
            <h5>${pricingPackageName[2]}</h5>
        </div>
    </div> 
    `

    let featureHtmlForModal = ``;
    // console.log(data.features[1].feature_name);
    const keys = Object.keys(data.features);
    keys.forEach(key => {
        // console.log(key, data.features[key].feature_name)
        featureHtmlForModal += `<li>${data.features[key].feature_name}`;

    })

    let integrationHtml = ``;
    data.integrations ? data.integrations.forEach(item => {
        integrationHtml += `<li>${item}</li>`;
    }) : integrationHtml = "No data Found";

    modalCardLeft.innerHTML = `
        <h5 class="card-title">${data.description}</h5>
        <div class="d-md-flex justify-content-between my-3">
        
           ${pricingHtml}
        </div>
        <div class="d-md-flex justify-content-between ">
            <div>
                <h5 class="card-title">Features</h5>
                ${featureHtmlForModal}
            </div>
            <div>
                <h5 class="card-title">Integrations</h5>
                ${integrationHtml}
            </div>
        </div>
        
       
    `;

    let questionAnswerHtml = ``;
    data.input_output_examples ? questionAnswerHtml = `
            <h5 class="card-title">${data.input_output_examples[0].input}</h5>
            <p class="card-text">${data.input_output_examples[0].output}<p>
    `: questionAnswerHtml = `
        <h5 class="card-title">Can you give any example?</h5>
        <p class="card-text">No! Not Yet! Take a break!!!<p>
    `

    let accuracyHtml = ``;
    (data.accuracy && data.accuracy.score !== null) ? accuracyHtml = `
    <button type="button" class="btn btn-danger accuracy-btn fw-semibold">${(data.accuracy.score) * 100}% accuracy</button>
    `: accuracyHtml = ``;

    modalCardRight.innerHTML = `
            <div class="accuracy-block">
                <img class="img-fluid rounded" src="${data.image_link[0]}">
                ${accuracyHtml}
            </div>
            <div class="text-center mt-3">
                ${questionAnswerHtml}
            </div>
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

