import React, { useState } from 'react';

const PowerBall = ({ bits, setBits }) => {
  const [nums, setNums] = useState('');

  const calcNums = () => {
    let max = 69 * 68 * 67 * 66 * 65 * 26;
    let bitsNeeded = Math.ceil(Math.log(max) / Math.log(2));
    let qrn = parseInt(bits.slice(-bitsNeeded), 2);
    let bitsUsed = bitsNeeded;
    let maxPoss = (2 ** bitsUsed);
    let cutoff, done, biggestAvailPowOf2, powerOf2Needed, nBitsToGet, nextBits, newNums;

    while (bitsUsed < bits.length) {
      if (qrn < max) {
        newNums = [];
        newNums.push(qrn % 69 + 1);
        newNums.push(qrn % 68 + 1);
        newNums.push(qrn % 67 + 1);
        newNums.push(qrn % 66 + 1);
        newNums.push(qrn % 65 + 1);
        newNums = validateNums(newNums);
        newNums.sort((a, b) => a - b);
        newNums.push(qrn % 26 + 1);
        return { picks: newNums.toString(), bitsUsed }
      } else {
        cutoff = max;
        done = false;

        do {
          biggestAvailPowOf2 = Math.floor(Math.log(maxPoss - cutoff) / Math.log(2)); // e.g. 34
          powerOf2Needed = Math.ceil(Math.log(qrn - cutoff) / Math.log(2));
          if (powerOf2Needed <= biggestAvailPowOf2) {
            nBitsToGet = bitsNeeded - biggestAvailPowOf2;
            bitsUsed += nBitsToGet;
            nextBits = bits.slice(-bitsUsed, nBitsToGet);
            qrn = parseInt(nextBits + (qrn - cutoff).toString(2).padStart(biggestAvailPowOf2, '0'), 2);
            done = true;
          }
          cutoff += (2 ** biggestAvailPowOf2);
        } while (!done)
      }
    }
    console.log('RAN OUT OF BITS');
  }

  const validateNums = (arr) => {
    const valids = arr.slice();
    let bump = 0, update = 0;
    for (let i = 1; i < valids.length; i++) {
      bump = 0, update = 0;
      do {
        bump += update;
        update = valids.slice(0, i).filter(x => x <= valids[i] + bump).length;
      } while (update - bump > 0);
      valids[i] += bump;
    }
    return valids;
  }

  const clickHandler = () => {
    const { picks, bitsUsed } = calcNums();
    setNums(picks);
    setBits(bits.slice(0, -bitsUsed));
  }

  return (
    <>
      <h3>This is the PowerBall component.</h3>
      <button className="pb" onClick={clickHandler}>
        Gimme numbas!
      </button>
      <p>{nums}</p>
    </>
  )
}

export default PowerBall;