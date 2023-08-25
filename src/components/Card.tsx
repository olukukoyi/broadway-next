import React, { useEffect } from "react";

// we're supposed to recieve an object and render a card with the object information
// but i only can get the name
// unable to see relation between shows and performs but can see them in database

interface CardProps {
  name: string;
}

const Card = ({ name }: CardProps) => {
  return <div className="font-bold bg-red bg-opacity-50 px-2 py-4 rounded" >{name}</div>;
};

export default Card;
