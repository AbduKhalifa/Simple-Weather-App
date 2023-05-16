"use strict";


// This function responsible about open Or close search input
function togglesearch()
{
    this.nextElementSibling.classList.toggle("active")
};
document.querySelector("#btnSearch").addEventListener("click",togglesearch);



// Here We Will Send Request To API
function request(q = "fayoum")
{
    let valueOfApi = `https://api.weatherapi.com/v1/forecast.json?key=6630ef57a3a04404838192532231902&q=${q}&days=3`

    let httpReq = new XMLHttpRequest();
    httpReq.open("GET",valueOfApi);
    httpReq.send();
    let ans;


    httpReq.addEventListener("readystatechange",function(){
        if(httpReq.readyState === 4 && httpReq.status === 200)
        {
            ans = JSON.parse(httpReq.response);
            EditDataMainPackage(ans)
        }
    }) 
}
//Send Request
request();



//Edit about first package 

function EditDataMainPackage(object)
{
    let firstChild = document.querySelector("#mainPackage > div");

    // title
    firstChild.children[1].innerHTML = `<h2 class="text-center">${object.location.name}</h2>`;

    //status
    let status = document.querySelector("#status");
    status.innerHTML = object.current.condition.text;

    //wind speed
    document.querySelector("#windSpeed").innerHTML = object.current.wind_kph;

    // temp
    let temp = firstChild.children[2].children[0];
    temp.innerHTML = `${object.current.temp_c} 'C`;

    //icon
    //let icon = document.querySelector("#statusImg");
    setIcons("statusImg",status);
    setNameDay("currentDay",object,1);

    EditDataSecondPackage(object);
}



function EditDataSecondPackage(object)
{
    let secondChild = document.querySelector("#secondPackage > div");

    //temp
    let temp = secondChild.children[1].children[0];
    temp.innerHTML = `${object.forecast.forecastday[1].day.avgtemp_c} 'C`

    // status
    let status = document.querySelector("#status2");
    status.innerHTML = `${object.forecast.forecastday[1].day.condition.text}`;

    //icon
    setIcons("statusImg2",status,2);

    //Date
    setNameDay("currentDayAgain",object,1);


    EditDataThirdPackage(object);

}

function EditDataThirdPackage(object)
{
    let thirdChild = document.querySelector("#thirdPackage > div");

    //temp
    let temp = thirdChild.children[1].children[0];
    temp.innerHTML = `${object.forecast.forecastday[2].day.avgtemp_c} 'C`

    //status
    let status = document.querySelector("#status3");
    status.innerHTML = `${object.forecast.forecastday[2].day.condition.text}`;

    //icon
    setIcons("statusImg3",status,3);

    //Date
    setNameDay("currentDayPlusOne",object,2);
}




// this function for using to set icons
function setIcons(id,status,num = "")
{
    let element = document.querySelector(`#${id}`)


        if(/rain/ig.test(status.innerHTML))
        {
            element.outerHTML= `
            <img src='./icons/animated/cloudy-day-1.svg' alt='' id="statusImg${num}">
            `;
        }
        else if(/snow/ig.test(status.innerHTML))
        {
            element.outerHTML= `
            <img src='./icons/animated/snowy-5.svg' alt='' id="statusImg${num}">
            `;
        }
        else if(/Clear/ig.test(status.innerHTML))
        {
            element.outerHTML = `
            <img src='./icons/animated/night.svg' alt='' id="statusImg${num}">
            `;
        }
        else if(/cloudy/ig.test(status.innerHTML))
        {
            element.outerHTML = `
            <img src='./icons/animated/cloudy-day-1.svg' alt='' id="statusImg${num}">
            `;
        }
        else if(/Sunny/ig.test(status.innerHTML))
        {
            element.outerHTML = `
            <img src='./icons/animated/day.svg' alt='' id="statusImg${num}">
            `;
        }
        else if(/Overcast/ig.test(status.innerHTML) || /mist/ig.test(status.innerHTML))
        {
            element.outerHTML = `
            <img src='./icons/animated/cloudy.svg' alt='' id="statusImg${num}">
            `;
        }
        else
        {
            element.outerHTML = `
            <img src='./icons/animated/day.svg' alt='' id="statusImg${num}">
            `;
        }

}



// u can use this function so changing innerHTML day's field
function setNameDay(para,object,numOfDay)
{
    let element = document.querySelector(`#${para}`);
    let date = object.forecast.forecastday[numOfDay].date;

    element.innerHTML = new Intl.DateTimeFormat("en-US",{weekday : "long"}).format(new Date(date));
}


//Search
let searchInput = document.querySelector(`[name="q"]`);

searchInput.addEventListener("input",function()
{
    request(`${this.value}`);
});
































