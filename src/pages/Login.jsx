// const Login = () => {
//     return (
//         <div>Login</div>
//     )
// }

// export default Login

import { Helmet } from 'react-helmet'
import { LoginForm } from '../components/LoginForm/LoginForm'

const Login = () => {
    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
        <LoginForm />
      </div>
    )
}

export default Login