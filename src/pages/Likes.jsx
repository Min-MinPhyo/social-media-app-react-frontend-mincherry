import { Box, Typography,Alert} from "@mui/material";
import UserList from "../components/UserList"
import {useQuery} from "react-query"
import {fetchCommentLikes,fetchPostLikes} from "../libs/fetcher"
import { useParams } from "react-router-dom";
export default function Likes(){

    const {id,type}=useParams()
    const {isLoading,isError,data,error}=useQuery(
        ['users',id,type],
        ()=>{
            if(type == "commment"){
                return fetchCommentLikes(id)
            }else{
                return fetchPostLikes(id)
            }
        }
    )

    if (isError) {
        return (
        <Box>
        <Alert severity="warning">{error.message}</Alert>
        </Box>
        );
        }

        if (isLoading) {
            return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
            }
  


    return (
        <Box>
         <UserList title="Likes" data={data}/>
        </Box>
    )
}