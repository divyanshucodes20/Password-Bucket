import { useState, useRef, useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const showPasswordRef = useRef(null);
  const passwordref = useRef(null);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordsarray, setpasswordsarray] = useState([]);
  const [showPassword, setshowPassword] = useState(false);
  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json()
    setpasswordsarray(passwords)
  }

  useEffect(() => {
    getpasswords()
  }, [])

  const showpassword = () => {
    const passwordInput = passwordref.current;
    if (passwordInput) {
      passwordInput.type = showPassword ? 'password' : 'text';
      setshowPassword(!showPassword); // Toggle the showPassword state

      // Update button text to 'Hide' if password is shown, otherwise 'Show'
      const buttonText = showPassword ? 'Show' : 'Hide';
      const button = document.getElementById('togglePasswordButton');
      if (button) {
        button.textContent = buttonText;
      }
    }
  };
  const savepassword = async () => {
    if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
      await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id })
      })
      setpasswordsarray([...passwordsarray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })
      //localStorage.setItem("passwords", JSON.stringify([...passwordsarray, { ...form, id: uuidv4() }]))
      setform({ site: "", username: "", password: "" })
      toast('password saved successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
    else {
      toast('Password not saved due to minimum length', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copytext = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text)
  }
  const deletepassword = async (id) => {
    let c = confirm("Do you really want to delete password")
    if (c) {
      toast('password deleted successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setpasswordsarray(passwordsarray.filter(item => item.id !== id))
      //localStorage.setItem("passwords", JSON.stringify(passwordsarray.filter(item=>item.id!==id)))
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
    }
  }
  const editpassword = (id) => {
    setform({ ...passwordsarray.filter(item => item.id === id)[0], id: id })
    setpasswordsarray(passwordsarray.filter(item => item.id !== id))

  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <Navbar />
      <div className=" md:mx-auto md:max-w-4xl md:px-20 min-h-[88.2vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-center text-lg '>Your Own Password Manager</p>
        <div className=" text-black  flex flex-col items-center p-4 gap-8">
          {/* Input fields and buttons */}
          <input onChange={handlechange} name="site" value={form.site} id='site' className='rounded-full border border-green-500 w-full py-1 px-4' type="text" placeholder=' website name/link ' />
          <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
            <input onChange={handlechange} name="username" id='username' value={form.username} className='rounded-full border border-green-500 w-full py-1 px-4' type="text" placeholder='Username' />
            <div className="relative flex items-center">
              <input
                ref={passwordref}
                onChange={handlechange}
                name="password"
                id='password'
                value={form.password}
                className='rounded-full border border-green-500 w-full py-1 px-4'
                type={showPassword ? 'text' : 'password'}
                placeholder='enter password'
              />
              <span
                onClick={showpassword}
                className='absolute right-1.5 cursor-pointer'
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <button onClick={savepassword} className=' gap-2 flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save
          </button>
        </div>
        <div className="passwords ">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordsarray.length === 0 && <div>No passwords to show</div>}
          {passwordsarray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100 '>
                {passwordsarray.map((item, index) => {
                  return <tr key={index}>
                    <td className='text-center  py-2 border border-white flex justify-center items-center gap-2 '>{item.site} <button onClick={() => { copytext(item.site) }} className='font-bold cursor-pointer'>copy</button></td>
                    <td className='text-center  py-2 border border-white'>{item.username} <button onClick={() => { copytext(item.username) }} className='font-bold'>copy</button></td>
                    <td className='text-center  py-2 border border-white'>{"*".repeat(item.password.length)} <button onClick={() => { copytext(item.password) }} className='font-bold'>copy</button></td>
                    <td className='text-center  py-2 border border-white'><span onClick={() => { deletepassword(item.id) }}><lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover" style={{ "width": "25px", "height": "25px", "cursor": "pointer" }}></lord-icon> </span><span onClick={() => { editpassword(item.id) }}>
                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "25px", "height": "25px", "cursor": "pointer" }}></lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          )}
        </div>
      </div >
      <Footer />
    </>
  );  
}

export default App
