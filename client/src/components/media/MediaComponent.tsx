import { Image } from '../styled/Image';
import { Audio } from './Audio';
import { Video } from './Video';

export function MediaComponent({
    type,
    src,
    controls = true,
    height = '300px',
}: {
    type: string;
    src: string;
    controls?: boolean;
    height?: string;
}) {
    switch (true) {
        case /^image/.test(type):
            return <Image height={height} src={src} alt='image' loading='lazy' />;

        case /^video\//.test(type):
            return <Video src={src} controls={controls} height={height} type={type} />;

        case /^audio\//.test(type):
            return <Audio src={src} controls={controls} type={type} />;

        default:
            return <div>Unsupported media type</div>;
    }
}
