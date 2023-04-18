class UserDTO {

    getuserDTO = (user) =>{
        return  {
            id: user._id,
            nombre:user.first_name,
            email:user.email,
            role:user.role,
            avatar:user.avatar||"url generica"
        }
    }
}

export default UserDTO;