/* eslint-disable @typescript-eslint/no-explicit-any */
export function Audio({
    src,
    controls = true,
    type,
}: {
    src: string;
    controls?: boolean;
    type: string;
}) {
    return (
        <audio controls={controls}>
            <source src={src} type={type} {...({ loading: 'lazy' } as any)} />
        </audio>
    );
}
