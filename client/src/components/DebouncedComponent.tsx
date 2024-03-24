import React, { useEffect, useState } from 'react';
import { DefaultValueConstants } from '../constants/DefaultValueConstants';

export function DebouncedComponent({
    showChild,
    children,
    delayInMs = DefaultValueConstants.loaderDelayInMs,
}: {
    showChild: boolean;
    children: React.ReactNode;
    delayInMs?: number;
}) {
    const [component, setComponent] = useState<React.ReactNode | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => setComponent(children), delayInMs);
        if (!showChild) {
            clearTimeout(timeout);
            setComponent(null);
        }
        return () => clearTimeout(timeout);
    }, [showChild]);

    return <>{component}</>;
}
