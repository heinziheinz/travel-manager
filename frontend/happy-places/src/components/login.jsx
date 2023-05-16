import { useState, useEffect } from "react";
import fetch from "./../utilities/fetch";
import Form from "./../components/form";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
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
        const options = {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(inputValue),
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            }),
        };
        (async () => {
            try {
                const data = await fetch(import.meta.env.VITE_URL + "login", options)
                console.log(data)
                console.log(data.message === "Success")
                if (data.message === "Success") {
                    navigate("/search-location")
                }
            } catch (err) {
                console.log(err)
            }
        })();

    }

    useEffect(() => {
        console.log(inputValue)
    }, [inputValue]);


    return (
        <Form handleSubmit={handleSubmit} inputFields={inputFields} onChangeHandler={onChangeHandler} />
        // <form onSubmit={handleSubmit}>
        //     {
        //         inputFields.map((fields, index) => {
        //             return (
        //                 < InputField
        //                     key={index}
        //                     name={fields.name}
        //                     className={fields.className}
        //                     label={fields.label}
        //                     type={fields.type}
        //                     placeholder={fields.placeholder}
        //                     onChangeHandler={onChangeHandler}
        //                     value={fields.value}
        //                 />
        //             );
        //         })
        //     }
        //     <SubmitButton value={"Submit"} />
        // </form>
    );
}
export default Login