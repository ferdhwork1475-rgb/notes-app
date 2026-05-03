import React from 'react'

const Navbar = () => {
  return (
    <header>
        <nav className='flex justify-evenly items-center'>
            <p className="font-bold">Stillness Notes</p>
            <ul>
                <Link >Features</Link >
                <Link >Pricing</Link >
                <Link >About</Link >
            </ul>
            <div>
                
            </div>
        </nav>
    </header>
  )
}

export default Navbar