export const LoginSuccessAction=(datauser)=>{
    return{
        type:'LOGIN_SUCCESS',
        payload:datauser
    }
}

export const gantiPassword =(newpass)=>{
    return {
      type:'GANTI_PASSWORD',
      payload:newpass
    }
  }