//1. How many searches?
//Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive binary search algorithm, 
//identify the sequence of numbers that each recursive call will search to try and find 8.

//It will start with 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 determine 4 as the middle index and 11 as the value and determine that 11 > 8, 
//so then it will use 3, 5, 6, 8, determine index 2 as middle with value 6, 6 < 8, so it will then use 8, 11, would return 8 because index would be 3,
//8 == 8, it would return index of 1

//Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive binary search algorithm, 
//identify the sequence of numbers that each recursive call will search to try and find 16.
//It will start with 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 determine 5 as the middle index and 12 as the value and determine that 12 < 16, 
//so then it will use 14, 15, 17, 18, determine index 7 as middle with value 15, 15 < 16, so it will then use 17, 18, would return 17 because index would be 8,
//17 > 16, start would then be 8 and end would be 7, resulting in return of -1

function binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};
binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 8, 0, 9);