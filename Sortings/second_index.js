// Sample array to visualize sorting (you can replace this with your own data)
const arrayToSort = [4, 2, 7, 1, 9, 5, 3, 8, 6];

function createCircles() {
    const arrayContainer = document.getElementById("array-containerX");

    for (let i = 0; i < arrayToSort.length; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.textContent = arrayToSort[i];
        arrayContainer.appendChild(circle);
    }
}

function swapElements(index1, index2) {
    const circles = document.querySelectorAll(".circle");
    const temp = arrayToSort[index1];
    arrayToSort[index1] = arrayToSort[index2];
    arrayToSort[index2] = temp;

    // Update the visual representation
    const circle1 = circles[index1];
    const circle2 = circles[index2];
    const tempText = circle1.textContent;
    circle1.textContent = circle2.textContent;
    circle2.textContent = tempText;
}

async function bubble_sort() {
    const circles = document.querySelectorAll(".circle");
    const n = arrayToSort.length;

    for (let i = n-1; i > 0; i--) {
        let swapped = false;

        for (let j = 0; j < i; j++) {
            // Highlight the circles being compared
            circles[j].style.backgroundColor = "#ff5733";
            circles[j + 1].style.backgroundColor = "#ff5733";
            
            // Wait for a moment to visually reflect the comparison
            await new Promise(resolve => setTimeout(resolve, 900));


            if (arrayToSort[j] > arrayToSort[j + 1]) {

                // Swap the elements in the array and update the circles visually
                swapElements(j, j + 1);
                swapped =  true;

            }

            // Wait for a moment to visually reflect the swap
            await new Promise(resolve => setTimeout(resolve, 200));

            // Remove the highlight after the swap
            circles[j].style.backgroundColor = "#3498db";
            circles[j + 1].style.backgroundColor = "#3498db";
        }

        if(swapped === false) break;
    }
}

async function insertion_sort() {
    const circles = document.querySelectorAll(".circle");
    const n = arrayToSort.length;

    for (let i = 1; i < n; i++) {

        for (let j = i; j > 0; j--) {
            // Highlight the circles being compared
            circles[j].style.backgroundColor = "#ff5733";
            circles[j - 1].style.backgroundColor = "#ff5733";
            
            // Wait for a moment to visually reflect the comparison
            await new Promise(resolve => setTimeout(resolve, 900));

            let correct_pos = false;

            if (arrayToSort[j] < arrayToSort[j - 1]) {

                // Swap the elements in the array and update the circles visually
                swapElements(j, j - 1);

            }
            else {
                correct_pos = true;
            }

            // Wait for a moment to visually reflect the swap
            await new Promise(resolve => setTimeout(resolve, 200));

            // Remove the highlight after the swap
            circles[j].style.backgroundColor = "#3498db";
            circles[j - 1].style.backgroundColor = "#3498db";

            if(correct_pos === true) break;
        }
    }
}

async function selection_sort() {
    const circles = document.querySelectorAll(".circle");
    const n = arrayToSort.length;

    for (let i = n-1; i > 0; i--) {

        for (let j = 0; j < i; j++) {
            // Highlight the circles being compared
            circles[i].style.backgroundColor = "#ff5733";
            circles[j].style.backgroundColor = "#ff5733";
            
            // Wait for a moment to visually reflect the comparison
            await new Promise(resolve => setTimeout(resolve, 900));

            if (arrayToSort[j] > arrayToSort[i]) {

                // Swap the elements in the array and update the circles visually
                swapElements(j, i);

            }

            // Wait for a moment to visually reflect the swap
            await new Promise(resolve => setTimeout(resolve, 200));

            // Remove the highlight after the swap
            circles[i].style.backgroundColor = "#3498db";
            circles[j].style.backgroundColor = "#3498db";
        }
    }
}

async function quick_sort() {
    quickSort(arrayToSort, 0, arrayToSort.length - 1);
}

async function quickSort(arr, low, high) {
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = await partition(arr, low, high);

        // Recursively sort the sub-arrays
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    const circles = document.querySelectorAll(".circle");
    const pivot = arr[high];
    let i = low - 1;

    // Highlight the pivot element
    circles[high].style.backgroundColor = "#ff5733";

    for (let j = low; j < high; j++) {
        // Highlight the current element being compared
        circles[j].style.backgroundColor = "#ff5733";

        // Wait for a moment to visually reflect the comparison
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (arr[j] < pivot) {
            i++;
            swapElements(i, j);
        }

        // Remove the highlight after the comparison
        circles[j].style.backgroundColor = "#3498db";
    }

    // Swap the pivot element with the element at i+1
    swapElements(i + 1, high);

    // Remove the highlight from the pivot
    circles[high].style.backgroundColor = "#3498db";

    return i + 1;
}

async function merge_sort() {
    const circles = document.querySelectorAll(".circle");
    const n = circles.length;
    for (let currSize = 1; currSize <= n - 1; currSize *= 2) {
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
            const mid = Math.min(leftStart + currSize - 1, n - 1);
            const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);

            // Highlight the left and right parts to be merged
            for (let i = leftStart; i <= mid; i++) {
                circles[i].style.backgroundColor = "#ff5733";
            }
            for (let i = mid + 1; i <= rightEnd; i++) {
                circles[i].style.backgroundColor = "#3498db";
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            await merge(circles, leftStart, mid, rightEnd);

            // Remove the highlights after merging
            for (let i = leftStart; i <= rightEnd; i++) {
                circles[i].style.backgroundColor = "#3498db";
            }
        }
    }
}

async function merge(circles, left, middle, right) {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    // Create temporary arrays to hold the left and right halves
    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    // Copy data to temporary arrays leftArr[] and rightArr[]
    for (let i = 0; i < n1; i++) {
        leftArr[i] = parseInt(circles[left + i].textContent);
    }
    for (let j = 0; j < n2; j++) {
        rightArr[j] = parseInt(circles[middle + 1 + j].textContent);
    }

    let i = 0; // Initial index of left subarray
    let j = 0; // Initial index of right subarray
    let k = left; // Initial index of merged subarray

    while (i < n1 && j < n2) {
        // Change the background color of the left and right parts to be merged
        for (let x = left; x <= middle; x++) {
            circles[x].style.backgroundColor = "#ff5733";
        }
        for (let y = middle + 1; y <= right; y++) {
            circles[y].style.backgroundColor = "#3498db";
        }

        // Wait for a moment to visually reflect the left and right parts
        await new Promise(resolve => setTimeout(resolve, 200));

        if (leftArr[i] <= rightArr[j]) {
            circles[k].textContent = leftArr[i];
            i++;
        } else {
            circles[k].textContent = rightArr[j];
            j++;
        }

        // Remove the highlight after the comparison
        for (let x = left; x <= middle; x++) {
            circles[x].style.backgroundColor = "#3498db";
        }
        for (let y = middle + 1; y <= right; y++) {
            circles[y].style.backgroundColor = "#3498db";
        }

        k++;
    }

    // Copy the remaining elements of leftArr[], if any
    while (i < n1) {
        circles[k].textContent = leftArr[i];
        i++;
        k++;
    }

    // Copy the remaining elements of rightArr[], if any
    while (j < n2) {
        circles[k].textContent = rightArr[j];
        j++;
        k++;
    }
}



async function heapify(n, i) {
    const circles = document.querySelectorAll(".circle");
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Highlight the elements being compared
    circles[i].style.backgroundColor = "#ff5733";

    if (left < n) {
        // Highlight the left child
        circles[left].style.backgroundColor = "#ff5733";
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (arrayToSort[left] > arrayToSort[largest]) {
            largest = left;
        }

        // Remove the left child highlight
        circles[left].style.backgroundColor = "#3498db";
    }

    if (right < n) {
        // Highlight the right child
        circles[right].style.backgroundColor = "#ff5733";
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (arrayToSort[right] > arrayToSort[largest]) {
            largest = right;
        }

        // Remove the right child highlight
        circles[right].style.backgroundColor = "#3498db";
    }

    if (largest !== i) {
        // Swap the elements
        swapElements(i, largest);

        // Call heapify recursively on the affected sub-tree
        await heapify(n, largest);
    }

    // Remove the highlight after comparison and swap (if any)
    circles[i].style.backgroundColor = "#3498db";
}


async function heap_sort() {
    const circles = document.querySelectorAll(".circle");
    const n = arrayToSort.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
        // Move the current root (maximum element) to the end of the array
        swapElements(0, i);

        // Highlight the swapped elements
        circles[0].style.backgroundColor = "#ff5733";
        circles[i].style.backgroundColor = "#ff5733";

        // Wait for a moment to visually reflect the swap
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Call heapify on the reduced heap
        await heapify(i, 0);

        // Remove the highlight after the swap
        circles[0].style.backgroundColor = "#3498db";
        circles[i].style.backgroundColor = "#3498db";

        // Color the sorted elements with green
        circles[i].style.backgroundColor = "#4CAF50";
    }

    // Color the last element with green
    circles[0].style.backgroundColor = "#4CAF50";
}


createCircles();

function processInput() {
    const inputArray = document.getElementById("input-array").value;
    const parsedArray = inputArray.split(',').map(str => parseInt(str.trim(), 10));

    if (!isNaN(parsedArray[0])) {
        // Clear the existing array elements
        const arrayContainer = document.getElementById("array-containerX");
        arrayContainer.innerHTML = "";

        // Update the arrayToSort with the user's input
        arrayToSort.length = 0;
        arrayToSort.push(...parsedArray);

        // Create circles for the new array
        createCircles();

        // Clear the input box
        document.getElementById("input-array").value = "";
    } else {
        alert("Please enter a valid comma-separated array.");
    }
}
function generateRandomArray() {
    // Clear the existing array elements
    const arrayContainer = document.getElementById("array-containerX");
    arrayContainer.innerHTML = "";

    // Define the minimum and maximum array size and element values
    const minSize = 2;
    const maxSize = 20;
    const minValue = -1000;
    const maxValue = 1000;

    // Generate a random array size between minSize and maxSize
    const arraySize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

    // Create a random array of the specified size
    const randomArray = [];
    for (let i = 0; i < arraySize; i++) {
        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        randomArray.push(randomValue);
    }

    // Update the arrayToSort with the random array
    arrayToSort.length = 0;
    arrayToSort.push(...randomArray);

    // Create circles for the new array
    createCircles();
}