import './Heading.scss';

interface attr {
    text: string;
}

export const Heading = (props : attr) => {

    let text_title = props.text;
    return (
        <h2 className="title"><span>{text_title}</span></h2>
    );
};

