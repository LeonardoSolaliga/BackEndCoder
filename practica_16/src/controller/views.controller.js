const register=(req,res)=>{
    res.render('register',{});
}

const login=(req,res)=>{
    req.logger.warning('warning')
    res.render('login',{});
}

const logout=(req,res)=>{
    try{
    req.session.destroy();
    res.redirect('/')
    }catch(err){
        res.send(err);
    }
}

const profile=(req,res)=>{
    res.render('profile',{user:req.session.user})
}

const inicio=async(req, res)=>{
    req.session.cookie.expires = new Date(Date.now() + 30000)
    res.render("inicio",{user:req.session.user});
}

export default{
    register,
    login,
    logout,
    profile,
    inicio

}