import axios from 'axios';
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function setPassword(event: ChangeEvent<HTMLInputElement>) {
        setPass(event.target.value);
    }

    function Username(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }


    function SignIn() {
        axios.post("http://localhost:3000/signin", { userName : username, passWord: pass })
            .then(response => {
                localStorage.setItem("token",response.data.token)
                navigate("/dash");
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("src/images/bg.jpg")' }}>
            <div className="flex flex-col justify-center backdrop-blur-md bg-opacity-50 bg-cyan-800 w-1/4 h-3/5 mt-10 items-center rounded-xl">
                <h1 className="text-white text-4xl py-5">Sign In</h1>
                <p className="text-white">Enter username</p>
                <input type="text" placeholder="Kochikame572" onChange={Username} className="px-2 border border-white outline-none py-1 mb-5 mt-2 w-3/4 rounded-md" />
                <p className="text-white">Enter password</p>
                <input type="password" placeholder="Abcd1234" onChange={setPassword} className="px-2 py-1 border border-white outline-none w-3/4 mb-5 mt-2 rounded-md" />
                <button onClick={SignIn} className="my-5 bg-yellow-700 text-white px-3 py-2 rounded-md">Sign In</button>
                <Link to="/signup">
                    <p className="mb-3 text-white">New user? Sign Up</p>
                </Link>
            </div>
        </div>
    )
}

export default SignIn
