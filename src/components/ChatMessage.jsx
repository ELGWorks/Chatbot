import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
//import UserProfileImage2 from '../assets/cat.jpg'; 5g
import dayjs from 'dayjs';
import './ChatMessage.css';

export function ChatMessage({ message, sender, time }) {

    return (
        <div className={
        sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-bot'
        }>
        {sender === "bot" && (
            <img src={RobotProfileImage} className="chat-message-profile" />
        )}
        <div className="chat-message-text">
            {message}
            <div className="message-time">{dayjs(time).format('h:mma')}</div>
        </div>
        {sender === "user" && (
            <img src={UserProfileImage} className="chat-message-profile" />
        )}
        </div>
    );
};