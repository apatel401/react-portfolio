const Card = ({
  cardInfo,
}: {
  cardInfo: {
    name: string;
    description: string;
    imageUrl: string;
    bgColor: string;
  };
}) => {
  const { name, description, imageUrl, bgColor } = cardInfo;

  
  return (
    <div className="flex flex-1 gap-5 p-2.5 rounded-xl border bg-[#1a1a1a] border-[#1a1a1a] hover:bg-dark-800 hover:border-[#E0E0E0]/50 hover:cursor-pointer transition-colors duration-200">
      <div className={`p-3 ${bgColor} rounded-lg w-fit`}>
        <img
          src={imageUrl}
          alt={`${name} logo`}
          className={`size-8`}
        />
      </div>
      <div>
        <h4 className="text-lg font-medium text-white">{name}</h4>
        <p className="text-dark-200/70 dark:text-white/70 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card