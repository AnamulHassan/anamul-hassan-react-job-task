import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaArrowUp } from 'react-icons/fa';
import { ItemTypes } from '../utils/items';

const Card = ({ singleData, index, moveCard, pageCount }) => {
  const ref = useRef(null);
  const { id, like, photo, title, username } = singleData;

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <tr
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="flex justify-between items-center h-24 border-[1px] rounded-2xl border-[rgba(255, 255, 255, 0.12)] hover:border-[#DBFD51] duration-300 hover:bg-white hover:bg-opacity-10 cursor-grab"
    >
      <td className="w-1/12 text-center">{(pageCount - 1) * 10 + index + 1}</td>
      <td className="w-5/12 flex justify-start items-center">
        <img
          onError={e =>
            (e.currentTarget.src =
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9880s8lk_z7qQgpcSbtFcBUNI74CDENbVyw&usqp=CAU')
          }
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
          onError={e =>
            (e.currentTarget.src =
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbOI9OHTBJi7XldL-6YXEeacY5cQfnAr9LQ&usqp=CAU')
          }
          className="w-6 h-6 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbOI9OHTBJi7XldL-6YXEeacY5cQfnAr9LQ&usqp=CAU"
          alt={username ? username : 'username not found'}
        />
        <p className="text-[#DBFD51] text-base font-thin">
          {username ? username : 'username not found'}
        </p>
      </td>
      <td className="w-4/12 text-end mr-4 ">
        <p className="inline-flex items-center">
          {like ? like : 'like'}
          <FaArrowUp className="ml-[9px] inline-block text-[#9BFF00]" />
        </p>
      </td>
    </tr>
  );
};

export default Card;
