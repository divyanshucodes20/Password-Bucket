import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-slate-800 px-4 h-14 items-center flex justify-between text-white'>
    <div className='text-white text-2xl'>
    <span className="text-green-700">&lt;</span>
      Pass
      <span className="text-green-700">OP/&gt;</span>
      </div>
<ul>
    <li className='flex gap-4'>
    <a className='hover:font-bold' href="/">Home</a>
    <a className='hover:font-bold'  href="#">About</a>
    <a className='hover:font-bold'  href="#">Contact</a>
    </li>
</ul>
</nav>
  )
}

export default navbar
