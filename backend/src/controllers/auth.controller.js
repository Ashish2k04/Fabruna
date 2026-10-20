
async function register(req, res) {
    res.status(200).json({
        message: 'User registered successfully',
        success: true,
        user: req.body
    })
}

export {register};   