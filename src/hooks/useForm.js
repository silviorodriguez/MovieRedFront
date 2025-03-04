import { useState } from "react"

function useForm (callback, defaults) {
    const [input, setInput] = useState(defaults)
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setInput({...input, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        callback(input)
    }
    return {
        input,
        handleInputChange,
        handleSubmit
    }
}
export default useForm