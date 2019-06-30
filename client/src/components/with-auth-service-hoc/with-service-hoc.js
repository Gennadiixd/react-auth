import React from 'react'
import AuthServiceContext from '../auth-service-context'

const WithAuthService = () => (Wrapped) => {
    return (props) => {
        return (
            <AuthServiceContext.Consumer>
                {
                    (authService) => {
                        return <Wrapped {...props} authService={authService} />
                    }
                }
            </AuthServiceContext.Consumer>
        )
    }
}

export default WithAuthService;
