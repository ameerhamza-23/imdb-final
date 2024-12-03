import {auth} from "@clerk/nextjs/server"

export const checkRole = async(role) => {

    const { sessionClaims } = await auth()
    console.log("sessionClaims : ",sessionClaims)
    return sessionClaims?.metadata.role === role

}