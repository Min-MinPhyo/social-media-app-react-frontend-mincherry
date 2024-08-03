export default function List({children}){
return(
    <ul
     style={{listStyle:"none",padding:0,margin:0,border:'4px solid #ddd',borderRadius:10,overflow:"hidden"}}
    >
        {children}
    </ul>
)
}