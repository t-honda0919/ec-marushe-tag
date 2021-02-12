import React, {useState} from 'react';
import Swiper from 'react-id-swiper';
import NoImage from '../../assets/img/src/no_image.png';

const ImageSwiper = (props) => {
    const [params] = useState({
        'pagination': {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },
        'navigation': {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        'loop': true,
        'spaceBetween': 30
    });

    const images = props.images;

    return(
        <Swiper {...params}>
            {images.length === 0 ? (
                <div className="p-media__thumb">
                    <img src={NoImage} alt="画像" />
                </div>
            ) : (
                images.map(image => (
                    <div className="p-media__thumb" key={image.id}>
                        <img src={image.path} alt="画像" />
                    </div>
                ))
            )}
        </Swiper>
    );
};

export default ImageSwiper;