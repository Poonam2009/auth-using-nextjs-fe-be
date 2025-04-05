// import { useParams } from "next/navigation"

export default function UserProfile ({params}:any) {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            <h1 className="text-2xl text-center"> User Profile</h1>
            <hr />
            <p className="text-4xl ">Profile Page 
                <span className="p-2 rounded-md bg-amber-400 text-black ml-2">{params.id}</span>
            </p>
        </div>
    )
}