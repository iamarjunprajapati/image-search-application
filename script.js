let accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
let inputElement = document.querySelector('input');
let page = 1;
let imageContainer = document.querySelector('.img-container');
const bodyContainer = document.querySelector('.body-container');

function getImages() {

    let inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    if (inputData !== "") {
        fetch(url).then(res => res.json()).then((data) => {
            const result = data.results.slice(0, 9);
            result.forEach(element => {
                console.log(element.alt_description);
                let div = document.createElement('div');
                div.classList.add("w-full", "sm:w-[calc(50%-1rem)]", "lg:w-[calc(25%-1rem)]", "h-[250px]", "bg-gray-200", "rounded", "overflow-hidden", "shadow-md");
                let img = document.createElement('img');
                let para = document.createElement('p');
                para.classList.add('text-sm', 'px-2');
                para.innerText = element.alt_description;
                img.setAttribute('alt', `${element.alt_description}`);
                img.setAttribute('src', element.urls.regular);
                img.classList.add("object-cover", "w-full", "h-[80%]");
                div.append(img,para);
                imageContainer.append(div);
            });
        });
        let loadMoreButton = document.querySelector('#load-more-button');
        if(loadMoreButton){
            loadMoreButton.remove();
        }
        let button = document.createElement('button');
        button.classList.add('px-4', 'py-2', 'bg-[green]', 'text-white', 'rounded','mt-5');
        button.innerText = "Load more..." ;
        button.id = 'load-more-button';
        button.addEventListener('click',()=>{
            getImages();
        });
    
        bodyContainer.append(button);

    }
}

inputElement.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        getImages(); // Call the function when Enter is pressed
    }
});


