import React, { useEffect, useState } from 'react'
import { getBubbleSortAnimation } from './bubbleSort'
import { getMergeSorted } from './mergeSort'
import { getInsertionSorted } from './insertionSort'
import { getQuickSorted } from './quickSort'
import { getRadixSorted } from './radixSort'

const Sorting = () => {

    const [mainArray, setMainArray] = useState([])
    const [size, setSize] = useState(100)
    const [speed, setSpeed] = useState(30)
    const [sortAlgo, setSortAlgo] = useState('bubbleSort')
    const [able, setAble] = useState(true)

    const primaryColor = "#074478"
    const secondaryColor = "cyan"
    const thirdColor = "red"

    useEffect( () => {
        if(able) {
            getNewArray(size)
        }
    },[size, sortAlgo])

// ABLE / DISABLE BUTTONS ETC.

    useEffect(() => {
        const items = document.getElementsByClassName('able');

        if(!able) {
            for(let i=0; i < items.length; i++) {
                items[i].style.pointerEvents = 'none';
                items[i].disabled = true;

                // items[i].style.backgroundColor = 'grey';
            }
        }else {
            for(let i=0; i < items.length; i++) {
                items[i].style.pointerEvents = 'auto';
                items[i].disabled = false;
            }
        }
    }, [able])

    const sort =() => {
        if(able) {
            if(sortAlgo === 'bubbleSort') bubbleSort()
            else if(sortAlgo === 'mergeSort') mergeSort()
            else if(sortAlgo === 'insertionSort') insertionSort()
            else if(sortAlgo === 'quickSort') quickSort()
            else if (sortAlgo === 'radixSort') radixSort()
        }
    }

    const getNewArray = (size) => {
        let arr = [];
        for(let i=0; i < size; i++) {
            const item = {
                idx : i,
                val : getNumFromInterval(100, 500)
            }
            arr.push(item)
            if(document.getElementsByClassName("sorting-array-bar")[i] != null ) {
                document.getElementsByClassName("sorting-array-bar")[i].style.backgroundColor = primaryColor
            }
        }
        
        if(able)
        setMainArray(arr)

    }

// BUBBLE SORT

    const bubbleSort = () => {
        const {animations, arr} = getBubbleSortAnimation(mainArray)
        const bars = document.getElementsByClassName("sorting-array-bar")

        setAble(false)

        let m = 0;
        for(let k = 0; k < animations.length; k++) {
            let i = animations[k].i
            let j = animations[k].j

            setTimeout(() => {
                bars[i].style.backgroundColor = secondaryColor
                bars[j].style.backgroundColor = secondaryColor
                
            }, m * speed)
            
            if(animations[k].swap) {
                setTimeout(() => {
                    bars[i].style.backgroundColor = thirdColor
                    bars[j].style.backgroundColor = thirdColor
                    
                    let temp = bars[i].style.height
                    bars[i].style.height = bars[j].style.height
                    bars[j].style.height = temp

                }, (m+1) * speed)
                m ++
            }

            setTimeout(() => {
                bars[i].style.backgroundColor = primaryColor
                bars[j].style.backgroundColor = primaryColor

            }, (m+1) * speed)
            m++
        }

        setTimeout(() => {
            let sortedArray = []
            for(let i = 0; i < size; i++) {
                bars[i].style.backgroundColor = 'purple'
                sortedArray.push({
                    idx : i,
                    val : arr[i]
                })
            }
            setMainArray(sortedArray)
            setAble(true)

        }, (m+1) * speed)

    }

// MERGE SORT

    const mergeSort = () => {
        setAble(false)
        let { sortedArray, count } = getMergeSorted(mainArray, speed)

        const newArr = []
        for(let i = 0; i < size; i++) {
            newArr.push({
                idx : i,
                val : sortedArray[i]
            })
        }

        setTimeout(() => {
            setMainArray(newArr)
            
            for(let i = 0; i < size; i++) {
                document.getElementsByClassName('sorting-array-bar')[i].style.backgroundColor = 'purple'
            }
            setAble(true)
        }, (count+10) * speed);

    }

// INSERTION SORT

    const insertionSort = () => {
        setAble(false)
        const { arr, counter } = getInsertionSorted(mainArray, speed)
        let newArray = [];

        for(let i =0; i < size; i++) newArray.push({ idx: i,val: arr[i] })

            setTimeout(() => {
                setMainArray(newArray)

                for(let i = 0; i < size; i++) {
                    document.getElementsByClassName('sorting-array-bar')[i].style.backgroundColor = 'purple'
                }
                setAble(true)
            }, counter * speed);
    }

// QUICK SORT

    const quickSort = () => {
        setAble(false)
        const { sortedArray, counter } = getQuickSorted(mainArray, speed)

        let newArray = []
        for(let i =0; i < size; i++) newArray.push({ idx: i,val: sortedArray[i] })

        setTimeout(() => {
            setMainArray(newArray)

            for(let i = 0; i < size; i++) {
                document.getElementsByClassName('sorting-array-bar')[i].style.backgroundColor = 'purple'
            }
            setAble(true)
        }, counter * speed);

    }

// RADIX SORT

    const radixSort = () => {
        setAble(false)
        const { sortedArray, counter } = getRadixSorted(mainArray, speed)

        let newArray = []
        for(let i =0; i < size; i++) newArray.push({ idx: i,val: sortedArray[i] })

        setTimeout(() => {
            setMainArray(newArray)

            for(let i = 0; i < size; i++) {
                document.getElementsByClassName('sorting-array-bar')[i].style.backgroundColor = 'purple'
            }
            setAble(true)
        }, counter * speed);
    }


// GET RANDOM NUMBER FROM A GIVEN INTERVAL
    const getNumFromInterval = (i, j) => {
        return i + Math.floor(Math.random() * (j-i))
    }

    return (
        <div className="sorting-container" >
            <div className="array-container">

                {
                    mainArray.map(item => {
                    return (
                        <div 
                        className="sorting-array-bar" 
                        key ={item.idx} 
                        style={{
                            height : item.val, 
                            backgroundColor : primaryColor
                        }} 
                        ></div>
                    )
                })}

            </div>

            <div className="utility-container">
                
                <label>Length of Array</label>
                <input
                    className="input-range able"
                    type = "range"
                    value = {size}
                    onChange = {(e) => setSize(e.target.value)}
                    min = "5"
                    max = "300"
                >
                </input>

                <label>Speed</label>
                <input
                    className="input-range able"
                    type = "range"
                    value = {500 - speed}
                    onChange = {(e) => setSpeed(500 - e.target.value)}
                    min = "350"
                    max = "499.5"
                >
                </input>

                <select className="select able" value={sortAlgo} onChange = {(e) => {setSortAlgo(e.target.value)}}>
                    
                    <option value="bubbleSort">bubbleSort</option>

                    <option value="quickSort">quickSort</option>

                    <option value="mergeSort">mergeSort</option>

                    <option value="radixSort">radixSort</option>

                    <option value="insertionSort">insertionSort</option>

                </select>

                <div className="btn able" onClick = {() => getNewArray(size)}> reset array </div>
                <div className="btn able" onClick = {() => sort()}> sort </div>
            </div>

        </div>
    )
}

export default Sorting