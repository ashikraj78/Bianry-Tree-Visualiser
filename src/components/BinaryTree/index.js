/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useMemo } from "react";
import BinaryTreeDataVisual from "../BinaryTreeDataVisual";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

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
  const [binaryArray, setBinaryArray] = useState([]);
  const binaryTree = useMemo(() => new BinaryTree(), []);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    if (binaryArray.length) {
      const treeData = convertToD3Format(binaryTree.root);
      setTreeData(treeData);
    }
  }, [binaryArray, binaryTree]);

  const handleSubmit = () => {
    const regex = /^[0-9]+(?:,[0-9]+)*$/;
    const isValid = regex.test(inputArray.current.value);
    if (isValid) {
      binaryTree.reset();
      setTreeData(null);
      const values = inputArray.current.value.split(",");

      values.forEach((element) => {
        binaryTree.insert(element);
      });

      setBinaryArray(values);
    } else {
      alert(
        "Only number and comma is allowed,\nNo space before and after comma,\nNo comma in last"
      );
    }
  };

  const convertToD3Format = (node) => {
    if (!node) return null;
    return {
      name: node.val,
      children: [
        convertToD3Format(node.left),
        convertToD3Format(node.right),
      ].filter(Boolean),
    };
  };

  return (
    <div className="landingView">
      <div>
        <input
          id="binaryArray"
          name="binaryArray"
          required
          ref={inputArray}
          className="binaryArrayInput"
          placeholder="Enter numbers   1,2,3,4,5,6"
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="button"
        >
          Submit
        </button>
      </div>
      {treeData && <BinaryTreeDataVisual data={treeData} />}
    </div>
  );
}

export default BinaryTrees;
