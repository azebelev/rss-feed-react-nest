import styled from '@emotion/styled';

export const Image = styled.img<{
    height?: string;
}>`
    object-fit: contain;
    object-position: center;
    height: ${(props) => props.height || 'auto'};
`;
