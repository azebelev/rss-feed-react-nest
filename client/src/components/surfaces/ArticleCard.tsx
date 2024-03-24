import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import {} from 'react-router-dom';
import { ArticleDto } from '../../hooks/useArticlesService';
import { MediaComponent } from '../media/MediaComponent';
import { CustomCard } from '../styled/CustomCard';

function ArticleCard({ article }: { article: ArticleDto }) {
    const { title, mediaType, mediaUrl, mediaCredit, content, pubDate, creator } = article;

    return (
        <CustomCard gap={'20px'}>
            <Typography gutterBottom variant='h5' component='h2'>
                {title}
            </Typography>
            {mediaUrl && mediaType ? (
                <>
                    <MediaComponent type={mediaType} src={mediaUrl} />
                    {mediaCredit ? (
                        <Typography textAlign={'center'} variant='body2' component='p'>
                            {mediaCredit}
                        </Typography>
                    ) : null}
                </>
            ) : null}
            <Typography variant='body1' component='p'>
                {content}
            </Typography>
            <Typography variant='body2' component='p'>
                Published by: {creator} on {dayjs(pubDate).format('dddd,DD MMM YYYY ')}
            </Typography>
        </CustomCard>
    );
}

export default ArticleCard;
