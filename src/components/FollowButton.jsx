import { useMutation } from "react-query"
import { queryClient, useApp } from "../ThemedApp"
import { deleteFollow, postFollow } from "../libs/fetcher"
import { Button } from "@mui/material"


export default function followButton({user}){

    const {auth}=useApp()
    if(!auth) return <></>

    function isFollowing(){
        return user.following.find(item => item.followerId == auth.id)
    }


    const follow=useMutation(
        id => {
            return postFollow(id)
        },
        {
            onSuccess : async ()=>{
                await queryClient.refetchQueries("users")
                await queryClient.refetchQueries("user")
                await queryClient.refetchQueries("search")
            }
        }
    )

    const unFollow=useMutation(id=>
        {
        deleteFollow(id)
    },
    {
        onSuccess :async ()=>{
            await queryClient.refetchQueries("users")
            await queryClient.refetchQueries("user");
            await queryClient.refetchQueries("search");
        }
    }
    
    )



    return (
        auth.id == user.id ? (<></>) :(

            <Button
              size="small"
              variant={isFollowing() ? "outlined" : "contained"}
              sx={{borderRadius :5}}
              onClick={(e)=>{

                if(isFollowing()){
                    unFollow.mutate(user.id)
                }else{
                    follow.mutate(user.id)
                }
                e.stopPropagation()

              }}
            >

            {isFollowing () ? "Following" : "Follow"}
            </Button>

        )
    )
}