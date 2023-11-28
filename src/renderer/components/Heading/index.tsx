import './Heading.scss';

interface attr {
    text: string;
}

export const Heading = (props : attr) => {

    let text_title = props.text;
    return (
        <h2 className="hdglv2"><span>{text_title}</span></h2>
    );
};

export const Heading2 = (props : attr) => {
    let text_title = props.text;
    return (
        <h3 className="hdglv3">{text_title}</h3>
    );
};