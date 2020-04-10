const users=[];

const addUser=(username,id)=>{

    const user=username.trim().toLowerCase();

    if(!user){
        return {
            error:"Username does not exist"
        }
    }

    const findUser=users.find((user)=>{
        return user.username==username


    })

    if(findUser){
        return {
            error:"Username already exist"
        }
    }

    const getUserData={
        username,
        id

    }

    users.unshift(getUserData)

    return {
        getUserData 

    }
}

const removeUser=(id)=>{

    const getUserIndex=users.findIndex((user)=>{

        return user.id==id
    })

    if(getUserIndex!=-1){

        return users.splice(getUserIndex,1)[0];
    }

}

const getAllUsers=()=>{
    return users
    
}

const getCurrentUser=(id)=>{

    const user=users.find((auser)=>{
        return auser.id==id

    })

    return user
}

module.exports={
    addUser,
    removeUser,
    getAllUsers,
    getCurrentUser
}