import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import './index.scss'

export interface Props{
    rating: number,
};

export default function StarRating(props: Props){
    const numStars = Math.round(props.rating / 2);

    const Fullstars = [];
    const EmptyStars = [];

    for( let i = 0; i < 5; i++){
        if (i < numStars){
            Fullstars.push(i);
        } else{
            EmptyStars.push(i);
        }
    }

    return(
       <div className="movie-rating">
       {Fullstars.map(index=> 
            <FaStar key={index}/>)}
       {EmptyStars.map(index=> 
            <FaRegStar key={index}/>)}
       </div>
    );
}

