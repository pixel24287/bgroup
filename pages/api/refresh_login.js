import cookie from 'cookie'

export default (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('refreshToken', req.body, {
        httpOnly: false,
        secure: false,
        //sameSite: 'strict',
        path: "/"
    }))

    res.statusCode = 200;
    res.json({ success: true})
}
  