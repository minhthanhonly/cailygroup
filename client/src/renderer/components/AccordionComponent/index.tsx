import { useState } from 'react';


const AccordionItem = ({ title, subtitle, content: initialContent, btnContent, approveText, editIcon, closeIcon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(initialContent); // Trạng thái lưu trữ nội dung của accordion

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
  };
  
    return (
      <div className='list-accordion__parent'>
        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
          <div className='list-accordion__item__head'>
            <div className='list-accordion__item__head__title'>
              <p className='list-accordion__item__head__title__title'>{title}</p>
              <span className='list-accordion__item__head__title__subtitle'>{subtitle}</span>
            </div>
            <div className='list-accordion__item__head__btn'>
              <p className='list-accordion__item__head__btn__btn'>
                <a href="#" className='btn01'>{approveText}</a>
              </p>
              <p className='list-accordion__item__head__btn__icn'>
                <span className='icn-item'  onClick={toggleAccordion}><img src={editIcon} alt="edit" className="fluid-image"/></span>
                <span className='icn-item'><img src={closeIcon} alt="close" className="fluid-image" /></span>
              </p>
               {btnContent}
            </div>
          </div>
          <div className='list-accordion__item__content'>
              {isOpen && (
              <div className="list-accordion__item__content__inner">
                <div className='list-accordion__item__content__item'>
                   {content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export const AccordionComponent  = ({ items}) => {
    
    return (
      <div className='list-accordion'>
        <div className='list-accorditon__inner'>
            {items && items.map((item, index) => (
             <AccordionItem key={index} title={item.title}  subtitle={item.subtitle}  approveText={item.approveText} editIcon={item.editIcon} closeIcon={item.closeIcon} content={item.content}
              />
            ))}
        </div>
      </div>
    );
};
