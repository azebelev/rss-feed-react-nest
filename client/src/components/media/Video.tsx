export function Video({
    src,
    controls = true,
    height = 'auto',
    type,
}: {
    src: string;
    type: string;
    controls?: boolean;
    height?: string;
}) {
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <video controls={controls} height={height} {...({ loading: 'lazy' } as any)}>
            <source src={src} type={type} />
        </video>
    );
}
