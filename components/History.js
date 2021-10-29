export default function History({ gratitudes }) {
    return (
        <div className="text-2xl">

            {
                (gratitudes.length > 0) && 
                <div>Previously, you were grateful for 
                    <span className="font-bold"> 
                        {gratitudes.map(grat => ' '+ grat.entry).toString()}
                    </span>
                    <span>.</span>
                </div>
                
            }
            
        </div>
    )
}