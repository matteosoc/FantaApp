import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';


const LeftArrow = () => {
    const navigate = useNavigate();

    return (
        <Button variant="outline-dark" size="sm" className="mb-3" onClick={() => navigate(-1)} >
            <Icon.ArrowLeftShort size={20} />
            Torna indietro
        </Button>
    )
};

export default LeftArrow;