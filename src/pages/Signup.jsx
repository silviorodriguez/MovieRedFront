import useForm from '@/hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { registerUserService } from '@/services/userServices'
import '@/styles/form.css'
import logo from '@/assets/react.svg'

const SignUp = () => {
  const navigate = useNavigate()

  const datos = {
    name: '',
    email: '',
    password: ''
  }

  const sendData = async (data) => {
    try {
      const response = await registerUserService(data)
      if (response.status === 201) {
        console.log('Usuario creado exitosamente')
        navigate('/login')
      }
    } catch (error) {
      console.log('Ocurrió un error en Signup', error.message)
    }
  }

  const { input, handleInputChange, handleSubmit } = useForm(sendData, datos)

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src={logo}
          alt=""
          width={72}
          height={57}
        />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        {/* Campo de Nombre */}
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingName" // Cambié el ID para que sea único
            placeholder="Name"
            name="name" // El campo 'name' se corresponde con la propiedad en el estado
            value={input.name} // Usando el campo 'name' del estado
            onChange={handleInputChange}
          />
          <label htmlFor="floatingName">Name</label> {/* El ID debe coincidir */}
        </div>

        {/* Campo de Email */}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingEmail" // Cambié el ID para que sea único
            placeholder="Correo Electronico"
            name="email" // El campo 'email' se corresponde con la propiedad en el estado
            value={input.email} // Usando el campo 'email' del estado
            onChange={handleInputChange}
          />
          <label htmlFor="floatingEmail">Email</label> {/* El ID debe coincidir */}
        </div>

        {/* Campo de Contraseña */}
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword" // Cambié el ID para que sea único
            placeholder="Password"
            name="password" // El campo 'password' se corresponde con la propiedad en el estado
            value={input.password} // Usando el campo 'password' del estado
            onChange={handleInputChange}
          />
          <label htmlFor="floatingPassword">Password</label> {/* El ID debe coincidir */}
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign Up
        </button>

        <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
      </form>
    </main>
  )
}

export default SignUp
