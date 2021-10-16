export default function History({ gratitudes }) {
    return (
        <p className="text-2xl">

            {
                (gratitudes.length > 0) && 
                <div>Previously, you were grateful for 
                    <span className="font-bold"> 
                        {gratitudes.map(grat => ' '+ grat).toString()}
                    </span>
                    <span>.</span>
                </div>
                
            }
            
        </p>
    )
}