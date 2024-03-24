import ReactDOM from 'react-dom';
import { useIsFetching } from 'react-query';
import { DefaultValueConstants } from '../../constants/DefaultValueConstants';
import { DebouncedComponent } from '../DebouncedComponent';
import { CircularLoader } from './CircularLoader';

export function DebouncedGlobalLoader({
    delayInMs = DefaultValueConstants.loaderDelayInMs,
}: {
    delayInMs?: number;
}) {
    const isFetching = useIsFetching();

    return isFetching ? (
        <DebouncedComponent showChild delayInMs={delayInMs}>
            {ReactDOM.createPortal(<CircularLoader />, document.body)}
        </DebouncedComponent>
    ) : null;
}
