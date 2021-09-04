import React from 'react';

interface ValueViewerProps {
    format?: (val: number) => string;
    values: number[];
    update: number[];
    classes: { [key: string]: string };
}

export const ValueViewer: React.FC<ValueViewerProps> = ({
    classes,
    values,
    update,
    format = d => d,
}) => {
    return (
        <div style={{ marginTop: 10, width: '100%' }}>
            <div className={classes.container}>
                <div className={classes.item}>onChange:</div>
                {values.map((d, i) => (
                    <div key={i} className={classes.item}>
                        {format(d)}
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: 40 }} className={classes.container}>
                <div className={classes.item}>onUpdate:</div>
                {update.map((d, i) => (
                    <div key={i} className={classes.item}>
                        {format(d)}
                    </div>
                ))}
            </div>
        </div>
    );
};

