import React from 'react';
import Part from './part';
import { Course } from '../types';

interface Props {
    parts: Course[]
}

const Content = ({ parts }: Props) => { return (
    <div>
        { parts.map(part =>
            <Part
                key={ `${ part.type }-${ part.name }` }
                details={ part }
            />
        )}
    </div>
)};
  
export default Content;