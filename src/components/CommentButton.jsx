import { Button, ButtonGroup, IconButton } from "@mui/material";
import {
    ChatBubbleOutline as CommentIcon
    } from "@mui/icons-material";
 
export default function Item({item,comment}){
    return (
        <>

        {
            !comment && (
                <ButtonGroup sx={{ml:3}}>
                    <IconButton size="small">
                        <CommentIcon fontSize="small" color="info"/>
                    </IconButton>

                    <Button
                     variant="text"
                     size="small"
                    >
                        {item.comments.length}
                    </Button>

                </ButtonGroup>
            )
        }



        
        </>
    )
}