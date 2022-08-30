import cookie from 'cookie'

export default (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('accessToken', '', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        path: "/",
        expires: new Date(0)
    }))

    res.statusCode = 200;
    res.json({ success: true})
}
  