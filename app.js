let array = [];

function generateRandomArray(size = 25, minValue = 10, maxValue = 80) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    createBars();
}

const arrayContainer = document.getElementById("array-container");

function createBars() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 5}px`;
        bar.style.width = `${100 / array.length - 2}%`;
        bar.innerHTML = value;
        arrayContainer.appendChild(bar);
    });
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
}

async function partition(arr, left, right) {
    let pivotIndex = right;
    let pivotValue = arr[pivotIndex];
    let i = left;

    updateColors(left, right, pivotIndex);

    for (let j = left; j < right; j++) {
        if (arr[j] < pivotValue) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            createBars();
            await sleep(300); // Speed increased by reducing the delay to 300ms
        }
    }

    [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
    createBars();
    await sleep(300); // Speed increased by reducing the delay to 300ms

    return i;
}

function updateColors(left, right, pivotIndex) {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.classList.remove('sorted', 'pivot');
        if (index === pivotIndex) {
            bar.classList.add('pivot');
        } else if (index >= left && index <= right) {
            bar.classList.add('sorted');
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startQuickSort() {
    quickSort(array);
}

// Generate random array initially
generateRandomArray();
