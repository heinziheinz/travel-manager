import { useState, useEffect } from "react";
import Form from "./../components/form";
import { useNavigate } from "react-router-dom";
import fetch from "./../utilities/fetch";

const Register = (props) => {
    const navigate = useNavigate();
    const inputValues = {
        username: "",
        email: "",
        password: ""
    }

    const [submitted, setSubmitted] = useState(false);
    const [inputValue, setinputValue] = useState(inputValues);

    const inputFields = [
        { type: "text", className: "first-name", name: "username", label: "User Name", placeholder: "Add your name", value: inputValue.username },
        { type: "email", className: "last-name", name: "email", label: "email", placeholder: "add your email", value: inputValue.email },
        { type: "password", className: "user-name", name: "password", label: "password", placeholder: "add your password", value: inputValue.password },
    ];

    const onChangeHandler = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
        setinputValue({
            ...inputValue,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        console.log(import.meta.env.VITE_URL) // 123
        // TODO: ausdoku entfernen
        setSubmitted(true);
        console.log(inputValue)
        const options = {
            method: "POST",
            body: JSON.stringify(inputValue),
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            }),
        };
        (async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL + "register", options)
                const users = await response.json();
                console.log("users in register")
                console.log(users)
                console.log(users.message === "Email has already been taken")
                if (users.message === "Email has already been taken") {
                    setSubmitted(false)
                } else if (users.message === "success!") {
                    setSubmitted(true)
                    setinputValue({
                        username: "",
                        email: "",
                        password: ""
                    });
                    setTimeout(() => {
                        console.log("Timeout")
                        navigate("/")
                    }, 4000)
                }
            } catch (err) {
                console.log(err)
                setSubmitted(false)
            }
        })();

    }

    useEffect(() => {
        console.log(inputValue)
    }, [inputValue]);

    if (!submitted) {
        return (
            <Form handleSubmit={handleSubmit} inputFields={inputFields} onChangeHandler={onChangeHandler} />
        );
    } else {
        return <p>{"Success"}</p>
    }
}
export default Register;