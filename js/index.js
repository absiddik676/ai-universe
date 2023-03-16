let fetchData = [];
// get all data from API
const lodeData = async () => {
    spinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json()
    fetchData = data.data.tools
    const sliceData = (data.data.tools).slice(0, 6);
    displayData(sliceData);
}


//  display all data
const displayData = data => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ' '
    data.forEach(data => {
        const { image, features, name, published_in, id } = data;
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card card-compact w-full bg-base-100 shadow-xl h-full mt-7">
                    <img class="rounded-3xl h-56 p-5 w-full" src="${image}" alt="" />
                <div>
                <div class="p-5">
                    <h3 class="text-2xl font-semibold">Features </h3>
                    <ul id="containerfgss" class="list-decimal list-inside">
                        <li class="${features[0] === undefined ? 'hidden' : ''}">${features[0]}</li>
                        <li class="${features[1] === undefined ? 'hidden' : ''}">${features[1]}</li>
                        <li class="${features[2] === undefined ? 'hidden' : ''}">${features[2]}</li>
                        <li class="${features[3] === undefined ? 'hidden' : ''}">${features[3]}</li>
                    </ul>
                    <hr class="mt-4 border">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-semibold mt-3">${name}</h3>
                        <p class="text-gray-500 mt-3"><i class="fa-solid fa-calendar-days text-gray-400"></i> ${published_in}</p>
                    </div>
                        <label for="my-modal-5" onclick="grtSingleData('${id}')" type="btn"  class=" bg-red-50 rounded-full w-10 h-10 cursor-pointer text-center"> <i class="fa-solid fa-arrow-right-long text-red-400 mt-3 "></i>  </label>
                    </div>
                </div>
            </div>
        </div>
    </div>

   `
        cardContainer.appendChild(div)
        spinner(false)
    })
}

// get  single data from API
const grtSingleData = async id => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json()
    displaySingleDataDetails(data.data);
}

// display shingle ali details in a modal
const displaySingleDataDetails = singleData =>{
    const {description,image_link,input_output_examples,pricing,features,integrations,accuracy} = singleData
    const modalContainer = document.getElementById('modal');
    modalContainer.innerHTML = `
    <div>
    <div class="modal-box w-11/12 max-w-5xl md:grid md:grid-cols-2 gap-5">
    <label for="my-modal-5" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label

    <div>
        <div class="bg-red-50  rounded-md border-red-400 border  p-5">
            <h1 class="tex-3xl font-bold">${description}</h1>
            <div class="grid md:grid-cols-3 my-5 gap-5">
                <div class="bg-white rounded-md">
                    <h1 class="text-center text-green-600 font-bold py-3"> ${pricing === null ? 'Free of Cost/Basic ' : pricing[0].price}<br>${ pricing === null ? '': pricing[0].plan}</h1>
                </div>
                <div class="bg-white rounded-md">
                <h1 class="text-center text-orange-500 font-bold py-3"> ${pricing === null ? 'Free Of Cost/Pro ' : pricing[1].price}<br>${ pricing === null ? ' ': pricing[1].plan}</h1>
                </div>
                <div class="bg-white rounded-md">
                <h1 class="text-center text-red-500 font-bold py-3"> ${pricing === null ? 'Free of Cost /Enterprise ' : pricing[2].price}<br>${ pricing === null ? ' ': pricing[2].plan}</h1>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-5">
                <div>
                    <h1 class="text-xl font-semibold">Features</h1>
                    <ul id="featuresUl" class="list-disc list-inside">
                        
                    </ul>
                </div>
                <div>
                    <h1 class="text-xl font-semibold">Integrations</h1>
                    <ul id="integrationUl" class="list-disc list-inside">
                    
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-center shadow-lg rounded-md p-5">
            <div class="badge badge-secondary relative top-8 lg:absolute  right-14 lg:top-14 ${accuracy.score === null ? 'hidden' : ''}">${(accuracy.score)*100}% accuracy </div>
            <img class="rounded-3xl h-56 w-full" src="${image_link[0]}" alt="" />
            <h1 class="text-2xl font-semibold my-4">${input_output_examples === null ? ' ':input_output_examples[0].input}</h1>
            <h1 class=" ">${input_output_examples === null ? 'No! Not Yet! Take a break!!!' : input_output_examples[0].output}</h1>
        </div>
    </div>
    
</div>
    </div>
    `
    //  features data get
    for(const key in features){
        const ul = document.getElementById('featuresUl')
        const li = document.createElement('li')
        li.classList.add("text-sm")
        li.innerText = `${features[key].feature_name}`
        ul.appendChild(li)
    }

    // integration data get
    if(integrations === null){
        const ul = document.getElementById('integrationUl')
        ul.innerText  = `No data Found`
        
    }
    else{
        for( const integration of integrations){
            const ul = document.getElementById('integrationUl')
            const li = document.createElement('li')
            li.classList.add("text-sm")
            li.innerText  = `${integration}`
            ul.appendChild(li)
            
        }
    }
    

}

// spinner
const spinner = isLoading =>{
    const loader = document.getElementById('loader')
    if(isLoading === true){
        loader.classList.remove('hidden')
    }
    else{
        loader.classList.add('hidden')
    }
}


// sort by date 
const sortByDate = () =>{
    const sortedData = fetchData
    fetchData.sort(function(a,b){
        return new Date(a.published_in) - new Date(b.published_in)
    })
    displayData(sortedData)    
}


// show all data function
const showAllData = () => {
    displayData(fetchData)
}


lodeData()