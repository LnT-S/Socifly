import { FETCH } from "../services/fetch";

export async function LIKE(id){
    let {data , status} = await FETCH(
      'GET',
      '/auth/like-image',
      {id: id}
    )
    console.log('LOG : LIKE STATUS',status,data)
    if(status===200){
        return true
    }else{
        return false
    }
  }