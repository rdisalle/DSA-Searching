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

//3. Find a book
//Imagine you are looking for a book in a library with a Dewey Decimal index. How would you go about it? Can you express this process as a search algorithm? 
//Implement your algorithm to find a book whose Dewey and book title is provided.

const library = [
    {deweyNum: '000.13',
      title: 'Dictionary'},
    {deweyNum: '001.13',
      title: 'Dictionary2'},
    {deweyNum: '020.13',
      title: 'Dictionary5'},
    {deweyNum: '300.13',
      title: 'Dictionary7'},
    {deweyNum: '430.13',
      title: 'Dictionary9'},
    {deweyNum: '500.13',
      title: 'Dictionary0'},
  ];

  function deweyFind (deweyNum, title, library, start=0, end=library.length-1) {
    if (start > end) {
      return -1;
    }
  
    const index = Math.floor((start + end) / 2);
    const book = library[index];
  
    if (parseFloat(book.deweyNum) === deweyNum) {
      if (book.title == title) {
        return index;
      }
      return -1;
    }
    else if (parseFloat(book.deweyNum) < deweyNum) {
      return deweyFind(deweyNum, title, library, index+1, end);
    }
    else if (parseFloat(book.deweyNum) > deweyNum) {
      return deweyFind(deweyNum, title, library, start, index-1);
    }
  }

  deweyFind ('000.13', 'Dictionary', library)

//4. Searching in a BST
//** No coding is needed for these drills**. Once you have answered it, you can then code the tree and implement the traversal to see if your answer is correct.

//1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. 
//What would be its postorder traversal?
//In-order 14 15 19 25 27 35 79 89 90 91
//Pre-order 35 25 15 14 19 27 89 79 91 90
//Post-order 14 19 15 27 25 79 90 91 89 35

//2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?
//Post 5 7 6 9 11 10 8
//Pre 8 6 5 7 9 10 11

//5. Implement different tree traversals
//Using your BinarySearchTree class from your previous lesson, create a binary search tree with the following dataset: 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22. 
//Then implement inOrder(), preOrder(), and postOrder() functions. Test your functions with the following datasets.

//A pre-order traversal should give you the following order: 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90

//In-order: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90

//Post-order: 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25
class _Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }
  
  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
      this.length = 0;
    }
  
    enqueue(data) {
      const node = new _Node(data);
      if (this.first === null) {
        this.first = node;
      }
      if (this.last) {
        this.last.next = node;
        node.prev = this.last;
      }
      this.length++;
      this.last = node;
    }
  
    dequeue() {
      if (this.first === null) {
        return;
      }
      this.length--;
      const node = this.first;
      this.first = this.first.next;
      // this.first.prev = null;
  
      if (node === this.last) {
        this.last = null;
      }
      return node.value;
    }
  
  }

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, 
         meaning that if the `left` pointer is empty, 
         then we can just instantiate and insert the new node 
         as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
         then we recursively call the `insert` method 
         so the node is added further down the tree */
      else {
        this.left.insert(key, value);
      }
    }
    // Similarly, if the new key is greater than the node's key 
    // then you do the same thing, but on the right - hand side * /
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
         then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
         then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children then
         simply remove it and any references to it 
         by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  bfs(values=[]){
    const queue = new Queue();
    queue.enqueue(this);
    while (queue.length){
      const node = queue.dequeue();
      values.push(node.value);
  
      if(node.left){
        queue.enqueue(node.left);
      }
      if(node.right){
        queue.enqueue(node.right);
      }
    }
    return values;
  }

}

function preOrder(bst){
  console.log(bst.key)
  if(bst.left){
    preOrder(bst.left)
  }
  if(bst.right){
    preOrder(bst.right)
  }
}
function inOrder(bst) {
  if (bst.left) {
    inOrder(bst.left)
  }
  console.log(bst.key)
  if (bst.right) {
    inOrder(bst.right)
  }
}
function postOrder(bst) {
  if (bst.left) {
    postOrder(bst.left)
  }
  if (bst.right) {
    postOrder(bst.right)
  }
  console.log(bst.key)
}


function main() {
  const BST = new BinarySearchTree();
  BST.insert(25, 25);
  BST.insert(15, 15);
  BST.insert(50, 50);
  BST.insert(10, 10);
  BST.insert(24, 24);
  BST.insert(35, 35);
  BST.insert(70, 70);
  BST.insert(4, 4);
  BST.insert(12, 12);
  BST.insert(18, 18);
  BST.insert(31, 31);
  BST.insert(44, 44);
  BST.insert(66, 66);
  BST.insert(90, 90);
  BST.insert(22, 22);
  postOrder(BST);
  console.log(BST);
}

main();

//6. Find the next commanding officer
//Suppose you have a tree representing a command structure of the Starship USS Enterprise.

//         Captain Picard
//      /                \
// Commander Riker       Commander Data
//   /         \               \
//Lt. Cmdr.   Lt. Cmdr.          Lt. Cmdr.
// Worf        LaForge            Crusher
//  /                           /
// Lieutenant                  Lieutenant
//security-officer             Selar

//This tree is meant to represent who is in charge of lower-ranking officers. For example, Commander Riker is directly responsible for Worf and LaForge. 
//People of the same rank are at the same level in the tree. However, to distinguish between people of the same rank, those with more experience are on the 
//left and those with less on the right (i.e., experience decreases from left to right). Suppose a fierce battle with an enemy ensues. Write a program that will 
//take this tree of commanding officers and outlines the ranking officers in their ranking order so that if officers start dropping like flies, we know who is the 
//next person to take over command.


function commandStructure(){
    const bst = new BinarySearchTree(5, 'Captain Picard');
  
    bst.insert(3, 'Commander Riker');
    bst.insert(6, 'Data');
    bst.insert(2, 'Worf');
    bst.insert(4, 'Laforge');
    bst.insert(1, 'security-officer');
    bst.insert(8, 'Crusher');
    bst.insert(7, 'Selar');
  
    return bst.bfs();
}

console.log(commandStructure());

//7. Max profit
//The share price for a company over a week's trading is as follows: [128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the company on a 
//particular day, and sell the shares on a subsequent day, write an algorithm to work out what the maximum profit you could make would be.

function maxProfit(arr){
    let max = 0;
    for(let i = 0; i< arr.length; i++){
      for(let j = i+1; j< arr.length; j++){
        if(arr[j] - arr[i] > max){
          max = arr[j] - arr[i];
        }
      }
    }
    return max;
  }
  
  console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]));

//8. Egg drop (optional)
//This is a fun exercise to do - consider this optional after you are done with all the exercises above. Imagine that you wanted to find the highest floor of 
//a 100 story building that you could drop an egg from without the egg breaking. But you only have 2 eggs. Write an algorithm to find out in the most efficient 
//way which floors you should drop the eggs from. After you have understood the question and made some attempts to solve the problem, go through this reading 
//before you start coding: http://datagenetics.com/blog/july22012/index.html.

