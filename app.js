const FLOWS = [6,13,19,25,31,38,44,50,56,63,69,75,81,88,94,100];

const REVERSE = {
  6:1.028571429,
  13:1.058823529,
  19:1.090909091,
  25:1.125,
  31:1.161290323,
  38:1.2,
  44:1.24137931,
  50:1.285714286,
  56:1.333333333,
  63:1.384615385,
  69:1.44,
  75:1.5,
  81:1.565217391,
  88:1.636363636,
  94:1.714285714,
  100:1.8
};

const NORMAL = {
  6:0.972972973,
  13:0.9473684211,
  19:0.9230769231,
  25:0.9,
  31:0.8780487805,
  38:0.8571428571,
  44:0.8372093023,
  50:0.8181818182,
  56:0.8,
  63:0.7826086957,
  69:0.7659574468,
  75:0.75,
  81:0.7346938776,
  88:0.72,
  94:0.7058823529,
  100:0.6923076923
};

let flowIndex = 0;

const distanceInput = document.getElementById("distance");
const currentFlow = document.getElementById("currentFlow");
const reverseValue = document.getElementById("reverseValue");
const normalValue = document.getElementById("normalValue");

function trunc1(v){
    return (Math.floor(v * 10) / 10).toFixed(1);
}

function updateFlow(){
    currentFlow.textContent = FLOWS[flowIndex];
    localStorage.setItem("flowIndex", flowIndex);
    calculate();
}

function calculate(){

    const distance = parseFloat(distanceInput.value);

    if(isNaN(distance) || distance <= 0){
        reverseValue.textContent = "-";
        normalValue.textContent = "-";
        return;
    }

    const flow = FLOWS[flowIndex];

    reverseValue.textContent =
        trunc1(distance * REVERSE[flow]);

    normalValue.textContent =
        trunc1(distance * NORMAL[flow]);

    localStorage.setItem("distance", distance);

}

document.getElementById("plus").onclick = () => {
    if(flowIndex < FLOWS.length - 1){
        flowIndex++;
        updateFlow();
    }
};

document.getElementById("minus").onclick = () => {
    if(flowIndex > 0){
        flowIndex--;
        updateFlow();
    }
};

distanceInput.addEventListener("input", calculate);

window.onload = () => {

    const savedDistance = localStorage.getItem("distance");
    const savedFlow = localStorage.getItem("flowIndex");

    if(savedDistance){
        distanceInput.value = savedDistance;
    }

    if(savedFlow){
        flowIndex = parseInt(savedFlow);
    }

    updateFlow();

};
