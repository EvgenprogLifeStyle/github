import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {useActions} from "../hooks/actions";

const FavoritesPage = () => {
    const {favourites} = useAppSelector(state=>state.github)

    if(favourites.length === 0 ) return <p className="text-center">No items.</p>

    const {removeFavourite} = useActions()


    return (
        <ul className="list-none px-4 py-4">
            {favourites.map(el=>
                <li key={el} className="mb-2">
                    <a href={el} target="_blank" className="block">
                       <b>Url:</b> {el}
                    </a>

                    {/*<button*/}
                    {/*    onClick={()=>removeFavourite(el)}*/}
                    {/*    className="px-4 py-2 bg-red-300 rounded text-white mt-1 hover:bg-red-500 transition-all ">Remove</button>*/}
                </li>)}

        </ul>
    );
};

export default FavoritesPage;