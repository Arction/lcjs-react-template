import React, { useEffect, useState } from 'react';
import './App.css'
import Chart from './Component/Chart'

const App = (props) => {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])

  // Example that simulates fetching remote data, and rendering it using a custom Chart component.
  useEffect(() => {
    const interval1 = setInterval(() => {
      setData1([
        {x: 0, y: Math.random() * 100},
        {x: 1, y: Math.random() * 100},
        {x: 2, y: Math.random() * 100},
        {x: 3, y: Math.random() * 100},
        {x: 4, y: Math.random() * 100},
      ])
    }, 3000)

    const interval2 = setInterval(() => {
      setData2([
        {x: 0, y: Math.random() * 100},
        {x: 1, y: Math.random() * 100},
        {x: 2, y: Math.random() * 100},
        {x: 3, y: Math.random() * 100},
        {x: 4, y: Math.random() * 100},
      ])
    }, 3000)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  return <div className='fill'>
    <Chart id='chart-1' data={data1}/>
    <Chart id='chart-2' data={data2}/>
  </div>
}

export default App
