import React, { useState, useEffect } from 'react';

const PowerBall = (props) => {
  const { bits, setBits } = props;
  const [nums, setNums] = useState('');

  const calcNums = () => {
    // five numbers 1 to 69, then one number 1 to 26
    let max = 69 * 68 * 67 * 66 * 65 * 26;
    let actual = parseInt(bits.slice(-36), 2);
    setBits(bits.slice(0, -36));
    console.log(`bits size is now ${bits.length}`)
    if (actual >= max) {
      // console.log(`actual is ${actual} which is ${actual / max - 1}% too big`);
      return calcNums();
    } else {
      let newNums = [];
      newNums.push(actual % 69 + 1);
      newNums.push(actual % 68 + 1);
      newNums.push(actual % 67 + 1);
      newNums.push(actual % 66 + 1);
      newNums.push(actual % 65 + 1);
      newNums = validateNums(newNums);
      newNums.push(actual % 26 + 1);
      return newNums.toString();
    }
  }

  const validateNums = (nums) => {
    const valids = nums.slice();
    for (let i = 1; i < valids.length; i++) {
      for (let j = i; j < valids.length; j++) {
        if (valids[j] >= valids[j - 1]) {
          valids[j]++;
        }
      }
    }
    return valids;
  }

  return (
    <>
      <h3>This is the PowerBall component.</h3>
      <button className="pb" onClick={() => setNums(calcNums())}>
        Gimme numbas!
      </button>
      <p>{nums}</p>
    </>
  )
}

export default PowerBall;