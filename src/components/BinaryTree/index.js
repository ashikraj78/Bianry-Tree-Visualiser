/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
const getLevelOfTree = (number) => {
  let found = false;
  let index = 1;
  let level = 0;
  while (!found) {
    console.log("start =>", index);
    if (number > index && number < index + index) {
      found = true;
    }

    level += 1;
    index += index;
    console.log("end =>", index);
  }
  return level;
};

class BinaryTree {
  constructor() {
    this.root = null;
  }

  reset() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();

      if (!node.left) {
        node.left = newNode;
        return;
      } else {
        queue.push(node.left);
      }

      if (!node.right) {
        node.right = newNode;
        return;
      } else {
        queue.push(node.right);
      }
    }
  }
}

function BinaryTrees() {
  const inputArray = useRef(null);
  const canvasRef = useRef(null);
  const [binaryArray, setBinaryArray] = useState(false);
  const binaryTree = useMemo(() => new BinaryTree(), []);
  const [level, setLevel] = useState(0);
  useEffect(() => {
    if (binaryArray.length) {
      renderBinaryTree();
    }
  }, [binaryArray, binaryTree]);

  const handleSubmit = (e) => {
    const values = inputArray.current.value.split(",");
    binaryTree.reset();

    values.forEach((element) => {
      binaryTree.insert(element);
    });

    setBinaryArray(values);

    const treeLevel = getLevelOfTree(values.length);

    setLevel(treeLevel);
    console.log(binaryTree, "binarytree");
    // renderBinaryTree();
  };

  const renderBinaryTree = useCallback(() => {
    console.log(binaryTree, binaryArray, "the binary root");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const nodeRadius = 10;
    const nodeGap = 20;
    const nodeGaps = Array(level)
      .fill(1)
      .map((val, index) => {
        return nodeGap * (index + 1);
      })
      .reverse();

    console.log(nodeGaps, "the node gaps");

    const renderNode = (node, x, y, level) => {
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.val, x, y);
      ctx.onclick = (e) => {
        console.log("Clicking on the", e);
      };

      if (node.left) {
        const leftX = x - nodeGaps[level];
        const leftY = y + nodeGaps[level];
        ctx.beginPath();
        ctx.moveTo(x, y + nodeRadius);
        ctx.lineTo(leftX, leftY - nodeRadius);
        ctx.stroke();
        renderNode(node.left, leftX, leftY, level + 1);
      }

      if (node.right) {
        const rightX = x + nodeGaps[level];
        const rightY = y + nodeGaps[level];
        ctx.beginPath();
        ctx.moveTo(x, y + nodeRadius);
        ctx.lineTo(rightX, rightY - nodeRadius);
        ctx.stroke();
        renderNode(node.right, rightX, rightY, level + 1);
      }
    };

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    if (binaryArray && binaryArray.length > 0) {
      clearCanvas();
      const rootX = canvas.width / 2;
      const rootY = nodeGaps[0];
      renderNode(binaryTree?.root, rootX, rootY, 0);
    }
  }, [binaryArray, binaryTree]);

  return (
    <div>
      <p>hello this is BinaryTree</p>
      <div>
        <input id="binaryArray" name="binaryArray" required ref={inputArray} />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
      {/* {binaryArray && ( */}
      <canvas
        ref={canvasRef}
        width={1020}
        height={600}
        style={{ border: "1px solid black" }}
      />
      {/* )} */}
    </div>
  );
}
export default BinaryTrees;
