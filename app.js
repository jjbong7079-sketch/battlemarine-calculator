const FLOWS = [6,13,19,25,31,38,44,50,56,63,69,75,81,88,94,100];

let flowIndex = 0;

const distanceInput = document.getElementById("distance");
const currentFlow = document.getElementById("currentFlow");
const reverseValue = document.getElementById("reverseValue");
const normalValue = document.getElementById("normalValue");

document.getElementById("plus").addEventListener("click", () => {
    if(flowIndex < FLOWS.length-1){
        flowIndex++;
        updateFlow();
    }
});

document.getElementById("minus").addEventListener("click", () => {
    if(flowIndex > 0){
        flowIndex--;
        updateFlow();
    }
});

distanceInput.addEventListener("input", calculate);

function updateFlow(){
    currentFlow.textContent = FLOWS[flowIndex];
    localStorage.setItem("flowIndex",flowIndex);
    calculate();
}

function trunc1(v){
    return Math.floor(v*10)/10;
}

async function loadData(){

    if(window.DB) return window.DB;

    const res = await fetch("data.json");

    window.DB = await res.json();

    return window.DB;
}

async function calculate(){

    const db = await loadData();

    const dist = parseInt(distanceInput.value);

    if(isNaN(dist)){
        reverseValue.textContent="-";
        normalValue.textContent="-";
        return;
    }

    const flow = FLOWS[flowIndex].toString();

    const reverse = db.reverse[dist]?.[flow];

    const normal = db.normal[dist]?.[flow];

    reverseValue.textContent =
        reverse==null ? "-" : trunc1(reverse).toFixed(1);

    normalValue.textContent =
        normal==null ? "-" : trunc1(normal).toFixed(1);

    localStorage.setItem("distance",dist);

}

(function(){

    const d = localStorage.getItem("distance");

    if(d) distanceInput.value=d;

    const f = localStorage.getItem("flowIndex");

    if(f) flowIndex=parseInt(f);

    updateFlow();

})();
