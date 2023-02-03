const Card = ({ singleData, index }) => {
  const { create_at, id, like, photo, title, update_a, user_id, username } =
    singleData;
  console.log(singleData);
  return (
    <tr className="flex justify-between items-center h-24 border-[1px] rounded-2xl border-[rgba(255, 255, 255, 0.12)]">
      <td className="w-1/12 text-center">{index + 1}</td>
      <td className="w-5/12 flex justify-start items-center">
        <img
          className="w-[118px] h-[64px] rounded-lg mr-4"
          src={
            photo
              ? photo
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9880s8lk_z7qQgpcSbtFcBUNI74CDENbVyw&usqp=CAU'
          }
          alt={title ? title : 'title not found'}
        />
        <p className="text-xl font-thin pr-[35px]">
          {title ? title : 'title not found'}
        </p>
      </td>
      <td className="w-2/12 flex items-center space-x-2">
        <img
          className="w-6 h-6 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbOI9OHTBJi7XldL-6YXEeacY5cQfnAr9LQ&usqp=CAU"
          alt={username ? username : 'username not found'}
        />
        <p className="text-[#DBFD51] text-base font-thin">
          {username ? username : 'username not found'}
        </p>
      </td>
      <td className="w-4/12 text-end mr-4">
        <p>{like ? like : 'like'}</p>
      </td>
    </tr>
  );
};

export default Card;
