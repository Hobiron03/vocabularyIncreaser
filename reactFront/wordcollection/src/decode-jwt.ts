import jwt_decode from 'jwt-decode';

const decodeJWT = (jwt: string): {} => {
    let decoded = jwt_decode(jwt);

    return decoded;
};

export default decodeJWT;