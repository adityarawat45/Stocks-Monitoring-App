import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [auth, setAuth] = useState(true);
    const navigate = useNavigate();

    function setPassword(event: ChangeEvent<HTMLInputElement>) {
        setPass(event.target.value);
    }

    function Username(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function setCPassword(event: ChangeEvent<HTMLInputElement>) {
        setCpass(event.target.value);
    }

    function SignUp() {
        if (pass !== cpass) {
            setAuth(false);
            return;
        }
        axios.post("http://localhost:3000/signup", { userName : username, passWord: pass })
            .then(response => {
                localStorage.setItem("token",response.data.token)
                navigate("/dash");
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className=" flex justify-center items-center bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("src/images/bg.jpg")' }}>
            <div className="flex flex-col h-3/5 justify-center backdrop-blur-md bg-opacity-50 bg-cyan-800 w-1/4 mt-10 items-center rounded-xl">
                <h1 className="text-white text-4xl py-5">Sign Up</h1>
                <p className="text-white">Enter username</p>
                <input type="text" placeholder="Kochikame572" onChange={Username} className="px-2 border border-white outline-none py-1 mb-5 mt-2 w-3/4 rounded-md" />
                <p className="text-white">Enter password</p>
                <input type="password" placeholder="Abcd1234" onChange={setPassword} className="px-2 py-1 border border-white outline-none w-3/4 mb-5 mt-2 rounded-md" />
                <p className="text-white">Confirm password</p>
                <input type="password" placeholder="Abcd1234" onChange={setCPassword} className="px-2 py-1 border border-white outline-none w-3/4 mt-2 rounded-md" />
                <button onClick={SignUp} className="my-5 bg-yellow-700 text-white px-3 py-2 rounded-md">Sign Up</button>

                <Link to="/signin">
                    <p className="mb-3 text-white">Already a user? Sign In</p>
                </Link>
                {!auth && <p>Please fill appropriate inputs</p>}
            </div>
        </div>
    );
}

export default Signup;