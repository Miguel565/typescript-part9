import '../App.css';

interface Props {
    messager: string;
}

const Notify = ({ messager }: Props) => {
    return (
        <div>
            {messager && <p className="error">{messager}</p>}
        </div>
    );
}

export default Notify;