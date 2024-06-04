import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function ProtectedUserRoutes({ children }) {
    const { Token, Role, Verified ,Email} = useSelector((state) => state.User);
    const location = useLocation();
    const user = {
        email: Email
    }
    return Token && Role == '1212'|| Token && Role == '1313' ? (
        Verified ?
            children :
            <Navigate to="/otp" state={{ user,from: location.pathname }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
    )
}

export default ProtectedUserRoutes;