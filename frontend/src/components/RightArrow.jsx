import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';


const RightArrow = () => {
    const navigate = useNavigate();

    return (
            <Icon.ArrowRightShort size={25} />
    )
};

export default RightArrow;