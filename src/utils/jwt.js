import expressJwt from "express-jwt";

export const authJwt = () => {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\api\/user(.*)/, methods: ['GET','POST','OPTIONS'] },
            { url: /\api\/category(.*)/, methods: ['GET','OPTIONS'] },
            { url: /\api\/tag(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\api\/post(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/user/register`,
            `${api}/user/login`,
            `${api}/user/refreshToken`,
            `${api}/upload`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }
    done();
}