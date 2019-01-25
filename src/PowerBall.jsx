import React, { useState, useEffect } from 'react';

const PowerBall = ({ bits, setBits }) => {
  const [nums, setNums] = useState('');

  const calcNums = () => {
    // five numbers 1 to 69, then one number 1 to 26
    let max = 69 * 68 * 67 * 66 * 65 * 26;
    let bitsNeeded = Math.ceil(Math.log(max) / Math.log(2));
    let qrn = parseInt(bits.slice(-bitsNeeded), 2);
    let bitsUsed = bitsNeeded;
    let maxPoss = (2 ** bitsUsed);
    let cutoff, done, biggestAvailPowOf2, powerOf2Needed, nBitsToGet, nextBits;
    let outloop = 0, inloop = 0;

    while (bitsUsed < bits.length) {
      // console.log(`Outloop=${outloop}, qrn=${qrn}.`)
      // outloop++;
      // if (outloop > 10) break;

      if (qrn < max) {
        let newNums = [];
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
        biggestAvailPowOf2 = Math.floor(Math.log(maxPoss - cutoff) / Math.log(2)); // e.g. 34
        powerOf2Needed = Math.ceil(Math.log(qrn - cutoff) / Math.log(2));
        done = false;

        inloop = 0;

        while (!done) {
          // console.log(`Cutoff=${cutoff}, qrn=${qrn}, inloop=${inloop}`)
          // inloop++
          // if (inloop > 20) break;


          if (powerOf2Needed <= biggestAvailPowOf2) {
            // if we're under it, then we can just top it up
            nBitsToGet = bitsNeeded - biggestAvailPowOf2;
            bitsUsed += nBitsToGet;
            nextBits = bits.slice(-bitsUsed, nBitsToGet);
            qrn = parseInt(nextBits + (qrn - cutoff).toString(2).padStart(biggestAvailPowOf2, '0'), 2);
            done = true;
          } else {
            // but if we're over it, try the next possible block
            cutoff += (2 ** biggestAvailPowOf2);
            biggestAvailPowOf2 = Math.floor(Math.log(maxPoss - cutoff) / Math.log(2));
            powerOf2Needed = Math.ceil(Math.log(qrn - cutoff) / Math.log(2));
          }
        }

      }
    }
    console.log('RAN OUT OF BITS');
  }

  const validateNums = (arr) => {
    const valids = arr.slice();
    for (let i = 0; i < valids.length - 1; i++) {
      for (let j = i + 1; j < valids.length; j++) {
        if (valids[j] >= valids[i]) {
          valids[j]++;
        }
      }
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