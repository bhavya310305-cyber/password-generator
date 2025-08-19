import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numallow, setNumallow] = useState(false)
  const [charallow, setCharallow] = useState(false)
  const [defaul, setDefaul] = useState("")

  const passwordref = useRef(null)
  const passwordgenerte = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow){
      str = str + "0123456789"
    }

    if(charallow){
      str = str + "!@#$%^&*-+=~`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setDefaul(pass)

  },[length, numallow, charallow, setDefaul])

  useEffect(() =>{
    passwordgenerte()
  }, [length, numallow, charallow, passwordgenerte])

  const copypassword = ()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(defaul)
  }
  return (
    <>
      <div className='mx-32 text-center my-32 text-5xl bg-[#212121] text-white font-bold'>Password Generator</div>
      <div className=' max-w-[525px] mx-auto shadow-md rounded-lg px-4 py-9  bg-gray-700'><div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text'
        value={defaul}
        className='outline-none w-full py-3 text-3xl text-center bg-white text-black' placeholder='password' readOnly ref={passwordref}/>
        <button onClick={copypassword} 
        className='outline-none bg-blue-700 text-white px-4 py-1 text-2xl font-bold'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={50} value = {length} className='cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}}/>
            <label className='text-orange-500 text-xl px-1'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 mx-3'>
            <input 
              type='checkbox'
              defaultChecked={numallow}
              id="numberInput"
              onChange={()=>{
                setNumallow((prev) => !prev);
              }}/>
              <label  className='text-orange-500 text-xl 'htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={charallow}
              id="charInput"
              onChange={()=>{
                setCharallow((prev) => !prev);
              }}/>
              <label  className='text-orange-500 text-xl 'htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
